Vue.component('ip-information', {
    props: ['section'],
    template:`
        <div class="mb-5">
            <h2>{{section.title}}</h2>
            <p>{{section.value}}</p>
        </div>
    
    `
})

var ipInformation = new Vue({
    el:'#ipInformation',
    data: {
        sections:[
            {
                id:1,
                title: "IP ADDRESS",
                value: "Random text",
            },
            {
                id:2,
                title: "LOCATION",
                value: "Random text",
            },
            {
                id:3,
                title: "TIMEZONE",
                value: "Random text",
            },
            {
                id:4,
                title: "ISP",
                value: "Random text",
            },
         
        ]
    }
})