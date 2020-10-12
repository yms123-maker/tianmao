define(["parabola","jquery","jquery-cookie"],function(parabola,$){
    function download(){

    }
    function sc_add(){
        var cookieStr=$.cookie("goods")
        if(!cookieStr){
            return;
        }
        $.ajax({
            url:"./data/box12.json",
            success:function(arr){
                var cookieArr=JSON.parse(cookieStr)
                var newArr=[]
                for(var i=0;i<cookieArr.length;i++){
                    for(var j=0;j<arr.length;j++){
                        if(cookieArr[i].id==arr[j].id){
                            arr[j].num=cookieArr[i].num
                            newArr.push(arr[j])
                        }
                    }
                }
                var str=``;
                for(var i=0;i<newArr.length;i++){
                    
                    str+=` <div class="commod" id="${newArr[i].id}">
                            <div class="main_info">
                                <img src="${newArr[i].img}" alt="">
                                <div class="main_infointro">${arr[i].intro}</div>
                            </div>
                            <div class="main_price">${newArr[i].price}</div>
                            <div class="main_number"><button class="main_reduce">-</button><span>${cookieArr[i].num}</span><button class="main_add id="${i}">+</button></div>
                            <div class="main_amount"></div>
                            <div class="main_opera">删除</div>
                        </div>`
                }
                $(".main_bottom").html(str)
            },
            error:function(msg){
                console.log(msg)
            }
        })
        sc_num()
    }
    function sc_num(){
        var cookieStr=$.cookie("goods")
        if(!cookieStr){
            return
        }
        var cookieArr=JSON.parse(cookieStr)
        var sum=0
        for(var i=0;i<cookieArr.length;i++){
            sum+=cookieArr[i].num
        }
        $(".shoppingcar_num").html(sum)
    }
    function sc_RightDelete(){
         $(".main_bottom").on("click",".main_opera",function(){
            // var id=$(this).parent().attr("id")
            var id=$(this).parent("div").remove().attr("id")

            console.log(id)
            var cookieArr=JSON.parse($.cookie("goods"))
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id==id){
                    cookieArr.splice(i,1)
                    break;
                }
            }
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            }) 
            sc_num()
            sc_add()
            
        })
    }
    function sc_RightNumBuntton(){
        $(".main_bottom").on("click",".main_add",function(){
            var id=$(this).parent("div").parent("div").attr("id")
            var cookieArr=JSON.parse($.cookie("goods"))
            var i=0
            var flag=false
            for(i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id==id){
                    flag=true
                    break;
                }
            }
            if(flag){
                cookieArr[i].num++;
                $(this).siblings("span").html(`${cookieArr[i].num}`);
            }
            
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
           
            sc_num()
        })
        $(".main_bottom").on("click",".main_reduce",function(){
            var id=$(this).parent("div").parent("div").attr("id")
            var cookieArr=JSON.parse($.cookie("goods"))
            var i=0
            var flag=false
            for(i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id==id){
                    flag=true
                    break;
                }
            }
            if(flag){
                cookieArr[i].num--;
                $(this).siblings("span").html(`${cookieArr[i].num}`);
            }
            if(cookieArr[i].num==0){
                var id=$(this).parent("div").parent("div").remove().attr("id")
                for(var i=0;i<cookieArr.length;i++){
                    if(cookieArr[i].id==id){
                        cookieArr.splice(i,1)
                        break;
                    }
                }
            }
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            sc_num()
            
        })

    } 
        
    return {
        sc_RightDelete,
        sc_RightNumBuntton,
        sc_add,
        sc_num
    };
})