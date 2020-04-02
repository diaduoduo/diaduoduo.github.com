<template>
    <div class="schedule">
        <div class="week">
            <div class="weekday">日</div>
            <div class="weekday">一</div>
            <div class="weekday">二</div>
            <div class="weekday">三</div>
            <div class="weekday">四</div>
            <div class="weekday">五</div>
            <div class="weekday">六</div>
        </div>
        <swiper class="swiper" :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiper-slide" v-for="item in swiperNumber">
                <div :id="'schedule'+item" ref="calendar"></div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
    var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
    var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
    var nStr2 = new Array('初', '十', '廿', '卅');
    var lunarInfo=new Array(
        0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
        0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
        0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
        0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
        0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
        0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
        0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
        0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
        0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
        0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
        0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
        0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
        0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
        0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
        0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);
    //公历节日
    var sFtv = new Array(
        "0101 元旦",
        "0214 情人节",
        "0308 妇女节",
        "0312 植树节",
        "0315 消费者权益日",
        "0401 愚人节",
        "0501 劳动节",
        "0504 青年节",
        "0512 护士节",
        "0601 儿童节",
        "0701 建党节",
        "0801 建军节",
        "0910 教师节",
        "0928 孔子诞辰",
        "1001 国庆节",
        "1006 老人节",
        "1024 联合国日",
        "1224 平安夜",
        "1225 圣诞节")
    var lFtv = new Array(
        "0101 春节",
        "0115 元宵节",
        "0505 端午节",
        "0707 七夕情人节",
        "0715 中元节",
        "0815 中秋节",
        "0909 重阳节",
        "1208 腊八节",
        "1224 小年")
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "schedule",
        data() {
            return {
                swiperContainer: [],
                swiperNumber: 6,
                swiperOption: {},
                selectedDate:[]
            }
        },
        created: function () {

        },
        mounted: function () {
            console.log(this.$refs);
            let fromdate = new Date();
            for (let k = 0; k < this.swiperNumber; k++) {
                for (let j = 0; j < 3; j++) {
                    this._createtable(this.$refs.calendar[k], fromdate.getFullYear(), fromdate.getMonth() + 3 * k + j, j);
                }
            }

        },
        methods: {
            _createtable(container, year, month, n) {
                let _this=this;
                let firstdate = new Date(year, month, 1);
                //获得下月开始时间
                let lastdate = new Date(year, month + 1, 0);
                //获得本月第一个星期一的时间
                let day = firstdate.getDay();
                let str = "";
                str += "<div class=\"calendar-header\">" + firstdate.getFullYear() + "年" + (firstdate.getMonth() + 1) + "月</div>"
                str += "<table id='calendar-table-" + container.id + "-" + n + "' class=\"calendar-table\" year=\"" + year + "\" month=\"" + month + "\">";
                str += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
                str += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
                str += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
                str += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
                str += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
                str += "</table>"
                //添加到dom
                let oDiv = document.createElement("div");
                oDiv.className = "wrap-table";
                oDiv.innerHTML = str;
                container.appendChild(oDiv);
                container = document.getElementById(container.id);
                var tds = container.querySelector("#calendar-table-" + container.id + "-" + n).querySelectorAll("td");
                for (var j = 0, i = firstdate.getTime() - day * 24 * 3600 * 1000; i <= lastdate.getTime() + (7 - day) * 24 * 3600 * 1000; j += 1, i += 24 * 3600 * 1000) {
                    if (!tds[j]) continue;

                    let aDiv=document.createElement("div");
                    aDiv.className=new Date().getTime()>i?"wrap-td disabled":'wrap-td';
                    aDiv.innerHTML=new Date(i).getDate();
                    aDiv.setAttribute("utc", i);
                    aDiv.addEventListener("click",function(){
                        if(this.className.indexOf("disabled")!==-1)return;
                        let i=this.getAttribute("utc");
                        if(this.className.indexOf("on")!=-1){
                            this.className="wrap-td";
                            let index=_this.selectedDate.indexOf(i);
                            _this.selectedDate.splice(index,1);
                        }else{
                            if(_this.selectedDate.length==6){
                                alert("最多选取6天查询");
                                return;
                            }
                            this.className="wrap-td on";
                            _this.selectedDate.push(i);
                            _this.selectedDate = [...new Set(_this.selectedDate)];
                        }
                    });
                    tds[j].appendChild(aDiv);
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        components: {
            swiper, swiperSlide
        }
    }
    function lYearDays(y) {
        var i, sum = 348;
        for(i=0x8000; i>0x8; i>>=1)sum+=(lunarInfo[y-1900]&i)?1:0;
        return(sum+leapDays(y));
    }
    //返回农历y年闰月的天数
    function leapDays(y) {
        if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
        else return(0);
    }
    //判断y年的农历中那个月是闰月,不是闰月返回0
    function leapMonth(y){
        return(lunarInfo[y-1900]&0xf);
    }
    //返回农历y年m月的总天数
    function monthDays(y,m){
        return((lunarInfo[y-1900]&(0x10000>>m))?30:29);
    }
    function Dianaday(objDate) {
        var i, leap=0, temp=0;
        var baseDate = new Date(1900,0,31);
        var offset   = (objDate - baseDate)/86400000;
        this.dayCyl = offset+40;
        this.monCyl = 14;
        for(i=1900; i<2050 && offset>0; i++) {
            temp = lYearDays(i)
            offset -= temp;
            this.monCyl += 12;
        }
        if(offset<0) {
            offset += temp;
            i--;
            this.monCyl -= 12;
        }
        this.year = i;
        this.yearCyl=i-1864;
        leap = leapMonth(i); //闰哪个月
        this.isLeap = false;
        for(i=1; i<13 && offset>0; i++) {
            if(leap>0 && i==(leap+1) && this.isLeap==false){	//闰月
                --i; this.isLeap = true; temp = leapDays(this.year);}
            else{
                temp = monthDays(this.year, i);}
            if(this.isLeap==true && i==(leap+1)) this.isLeap = false;	//解除闰月
            offset -= temp;
            if(this.isLeap == false) this.monCyl++;
        }
        if(offset==0 && leap>0 && i==leap+1)
            if(this.isLeap){ this.isLeap = false;}
            else{this.isLeap=true;--i;--this.monCyl;}
        if(offset<0){offset+=temp;--i;--this.monCyl;}
        this.month=i;
        this.day=offset+1;
    }
</script>
<style>
    .calendar-header {
        color: #4c4c4c;
        line-height: 1rem;
        text-align: center;
        font-size: 0.28rem;
    }

    .calendar-table {
        width: 100%;
    }

    .calendar-table td {
        text-align: center;
        color: #8c8b8b;
    }

    .schedule .wrap-table {
        padding-bottom: 0.4rem;
        border-bottom: 1px solid #f1f1f1;
    }
    .schedule .wrap-td{
        width: 1rem;
        height: 1rem;
        margin: 0 auto;
        border-radius: 50%;
        line-height: 1rem;
    }
    .wrap-td.on{
        background-color: #FB8181;
        color: #fff;
    }
    .wrap-td.disabled{
        color: #ccc;
    }
</style>
<style scoped>

    .weekday {
        line-height: 1rem;
        text-align: center;
        font-size: 0.28rem;
        color: #4d4d4d;
        flex: 1;
    }

    .week {
        position: fixed;
        width: 100%;
        height: 1rem;
        display: flex;
        left: 0;
        top: 0;
        background-color: #f6f6f6;
        z-index: 4;
    }

    .swiper {
        padding-top: 1rem;
    }

    .swiper, .swiper-slide {
        touch-action: none;
    }
</style>
