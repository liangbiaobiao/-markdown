var Main=Vue.component("Main",{
    template:`
    <div class="template">
        <div class="view">
            <div class="left">
                <router-view name="left"></router-view>
            </div>
            <div class="right">
                <router-view name="right"></router-view>
            </div>
        </div>
    </div>
`
});
var Left=Vue.component("Left",{
    data(){
        return{
            data:[]
        }
    },
    template:`
            <div>
                <ul>
                    <div v-for="item in menu">
                        <li><router-link :to="'#'+item.id"><h3 style="color: #000;">{{item.title}}</h3></router-link></li>
                        <ul>
                            <li v-for="item1 in item.child" style="margin-left: 16px">
                                <router-link :to="'#'+item1.id" style="text-decoration: none;"><h4 style="color: gray">{{item1.title}}</h4></router-link>
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>`,
    computed:{
        menu(){
            var arr=[];
            for(var i in this.data){
                if(this.data[i].pid==0){
                    var obj=this.data[i]
                    arr.push(obj)
                }else{
                    for(j in arr){
                        if(this.data[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.data[i])
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.data[i])
                            }
                        }
                    }
                }
            }

            return arr;
        }
    },
    mounted(){
        fetch('./data.txt').then(function (e) {
            return e.json();
        }).then((e)=>{
            this.data=e;
        })
    },
    watch:{
        $route:function(){
            let hash = this.$route.hash.slice(1);
            let child = document.querySelector('.a'+hash).offsetTop-20;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector('.right').scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: child }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.number.toFixed(0)
                })
                .start()

            animate()
        }
    }
});
var Right=Vue.component("Right",{
    data(){
        return{
            data:[]
        }
    },
    template:`
    <div class="markdown-body">
        <div v-html="data">
    
        </div>
    </div>
    
            `,
    computed:{

    },
    mounted(){
        fetch("./doc.txt").then(function (e) {
            return e.text()
        }).then((e)=>{
            this.data=e;
        })
    }
});
var Team = Vue.component('Team',{
    template:`
    <div> 
        <div class="tent">这是团队页面</div>
    </div>
    `
})
