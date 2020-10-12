define(["parabola","jquery","jquery-cookie"],function(parabola,$){
    function download(){
        $(".search_right>a").mouseenter(function(){
            $(".search_right>div").css("display","block")
        })
        $(".search_right>a").mouseleave(function(){
            $(".search_right>div").css("display","none")
        })
        $(".main_small").mouseenter(function(){
            $(".mark").css("display","block");
            $(".main_big").css("display","block");
        })
        $(".main_small").mousemove(function(ev){

            var l=ev.clientX-$(".main_small").offset().left-100
            var t=ev.clientY-$(".main_small").offset().top-100
            l=Math.max(0,l)
            l=Math.min(l,300)
            t=Math.max(0,t)
            t=Math.min(t,300)
            $(".mark").css({
                left:l,
                top:t
            });
            $(".main_big>img").css({
                left:-2*l,
                top:t*-2
            })
            
        })
        $(".main_small").mouseleave(function(){
            $(".mark").css("display","none");
            $(".main_big").css("display","none");
        })




        $(".main_rightp2>div").click(function(){
            $(".main_rightp2>div").css("backgroundColor","#fff")
            $(".main_rightp2>div").css("border","1px solid transparent")
            $(this).css("backgroundColor","#ccc")
            $(this).css("border","1px solid red")
        })

        
    }
    function shoppingCar(){
        var local=window.location.href
        var start=Number(local.lastIndexOf("#"))
        var result=Number(local.substring(start+1))
        var res=result
        $(".main_addinshopping").click(function(){
            sc_num()
            var id=res
            var first=!($.cookie("goods"))
            if(first){
                $.cookie("goods",JSON.stringify([{id:id,num:1}]),{
                    expires:7
                })
            }else{
                var cookieArr=JSON.parse($.cookie("goods"))
                var same = false;
                for(var i=0;i<cookieArr.length;i++){
                    if(cookieArr[i].id==id){
                        same=true
                        break
                    }
                }
                same ? cookieArr[i].num++ : cookieArr.push({id:id, num: 1});
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }
        })
    }
    

    function getImg(){
        var local=window.location.href
        var start=Number(local.lastIndexOf("#"))
        var result=Number(local.substring(start+1))
        $.ajax({
            url:"./data/box12.json",
            success:function(arr){
                var str=`<img src="${arr[result].img}" alt="">`;
                
                $(".main_small").append(str)
                $(".main_big").append(str)
            },
            error:function(error){
                console.log(console.error())
            }
        })
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
    return {
        download,
        shoppingCar,
        getImg,
        sc_num
    }
})