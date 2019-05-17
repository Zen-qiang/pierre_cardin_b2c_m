<template>
    <div class="sy-page">
        <div class="sy-contacts">
            <h3 class="sy-context">品牌招聘</h3>
            <div class="text-left sy-content">pierre cardin home 的每一位员工深受 Pierre Cardin
                关于生活哲理学的浸润，大胆创新、思维活跃、热爱生活。也为每一位有能力的人才的卓越表现和蓬勃发展提供了独一无二的环境氛围。加入 pierre cardin
                Home，与我们一同分享你在生活与工作上的不同体验，一同为每一个人的美好家居生活，进行锐意的探索与实践。</div>
            <div class="sy-more" @click="handleMore">
                <div class="sy-button">查看职位<i></i></div>
            </div>
        </div>
        <img src="../../assets/img/jiazu.jpg" class="margin-top-10 no-padding margin-bottom-10" width="100%" alt>
        <div class="text-left sy-contents">我们感恩员工们的付出，同时将品牌资源分享给所有的员工们。在品牌商学院中，将会有来自设计、艺术、时尚等各个不同领域的佼佼者以讲座、线上授课等形式为员工创造更多的学习机会，不断丰富自身创造力。</div>
        <div class="sy-contacts">
            <h4 class="text-left sy-title">工作空间</h4>
            <div class="text-left sy-content">办公空间品牌总部大楼位于中国上海，这座建筑前身曾为一座专业的医疗研究所并超过 70
                年的历史。我们已尊重过去、现在与将来的态度希望大楼将大楼打造成与周边社群可以和谐相处的存在。我们保留了大楼本身身处年代特有的水磨石地面；保留曾经的预制板天花并用颜色加以覆盖；创造性地将钢结构新楼与历史老楼以玻璃框架分离开来并将“老与新”的概念在公司的职能分布上进行结合。而这也是皮尔·卡丹家具的品牌重塑的重要象征之一。</div>
        </div>
        <img src="../../assets/img/company.jpg" class="margin-top-10 no-padding margin-bottom-10" width="100%" alt>
        <div class="sy-contacts">
            <h4 class="text-left sy-title">企业文化</h4>
            <div class="text-left sy-content">作为一个以重塑 70
                年代的纯正法国血统品牌为目的的企业，我们将创造力作为每个企业成员赖以生存的工作能力。追溯品牌的根源并完美地加入年轻化复兴的语言是品牌在当下飞速发展的时代里重回舞台的方式。每位员工将永远被激励去不断地提升从认知、系统、方法层面来完善个人与团队的创造力。</div>
        </div>
        <div class="sy-contacts">
            <h4 class="text-left sy-question">常见问题</h4>
            <div class="text-left sy-titles">我们鼓励您阅读 pierre cardin Home 招聘流程详细介绍，以便在申请中获取足够的信心。</div>
            <div class="text-left sy-titles">Pierre Cardin 的招聘流程是怎么样的？</div>
            <div class="text-left sy-content">根据职位不同，我们的招聘和聘用流程可能有所差异。不过，在线提交申请后，会有人力资源部门的工作人员审核申请。他们如果认为您适合该职位，便会安排电话面试，在某些情况下会采用视频面试。您可以藉此机会进一步介绍自己的技能、性格以及为何适合该职位。对于某些职位，我们要求候选任人参加某种形式的评估，然后进行背景和证明材料调查，最后提供工作机会</div>
            <div class="text-left sy-titles">Q & 我如何申请 pierre cardin Home 的职位？</div>
            <div class="text-left sy-content">请在上方页面点击查看职位，在线上提示的流程下进行职位了解与职位申请。</div>
            <div class="text-left sy-titles">Q & pierre cardin Home 看重候选人的哪些方面？</div>
            <div class="text-left sy-content">良好的品行是作为一切开始的先决条件。其次是良好的思维方式与个人创造力</div>
            <div class="text-left sy-content sy-cont">在线填写申请时，需回答关于您自己的若干问题，并提交简历。如果您希望提交更多信息，可在申请时上传相关资料。如果您申请的是创意、市场营销、数字化或设计团队的职位，请务必提供您的作品集。</div>
            <h4 class="sy-cooperation">为合作伙伴创造更大的价值！</h4>
            <div class="sy-more padding-bottom-30" @click="handleMore">
                <div class="sy-button">查看职位<i></i></div>
            </div>
        </div>
        <ul class="sy-img">
            <li>
                <img src="../../assets/img/workers.jpg" alt="">
            </li>
            <li>
                <img src="../../assets/img/girlworkers.jpg" alt="">
            </li>
        </ul>
        <div class="text-center text-dark sy-footers">
            'I have a name,<br>I have to take advantage of it'
        </div>
        <sy-footer></sy-footer>
    </div>
</template>
<script>
import syFooter from "@/page/public/footer";
export default {
    name: "contact",
    data() {
        return {};
    },
    mounted() {
        console.log(document.getElementsByClassName("sy-page"));
        // alert(document.getElementsByClassName("sy-page")[0].clientTop);
    },
    components: { syFooter },
    methods: {
        handleMore() {
            let url = "https://jobs.51job.com/all/co5179172.html";
            window.open(url);
        }
    }
};
</script>
<style lang="scss" scoped>
.sy-page {
    background-color: #faf8ef;
    .sy-contacts {
        width: 100%;
        line-height: 40px;
        padding: 0 10px;
        .sy-context {
            text-align: left;
            font-size: 1.2rem;
            font-weight: 700;
            padding-top: 25px;
            margin-bottom: 0.1rem;
            color: black;
        }
        .sy-title {
            font-size: 14px;
            color: #697279;
            margin-bottom: 8px;
        }
        .sy-content {
            padding-top: 0px;
            color: #697279;
            line-height: 20px;
            font-size: 11px;
            padding-bottom: 16px;
        }
    }
    .sy-contents {
        padding: 0 10px;
        color: black;
        font-size: 13px;
        font-weight: 700;
        line-height: 23px;
        padding-bottom: 16px;
        border-bottom: 1px solid #dbd8cf;
    }
    .sy-question {
        margin-top: 0;
        font-size: 1.1rem;
        color: black;
        border-bottom: 1px solid #dbd8cf;
    }
    .sy-titles {
        font-weight: 700;
        color: black;
        font-size: 11px;
        line-height: 23px;
        padding-bottom: 16px;
    }
    .sy-cont {
        padding-bottom: 30px !important;
        border-bottom: 1px solid #dbd8cf;
    }
    h4 {
        margin: 1.8rem 0;
    }
    .sy-more {
        width: 100%;
        margin: 0.8rem 0;
        .sy-button {
            margin: auto;
            width: 98%;
            line-height: 23px;
            font-size: 0.85rem;
            color: #8e8e8e;
            text-align: center;
            padding: 0.7rem 1.2rem 0.7rem 1.2rem;
            border: 0.02rem solid #eaeaea;
        }
    }
}
.sy-img {
    background-color: #faf8ef;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 0;
    margin: 0;
    li {
        list-style: none;
        flex: 0 0 50%;
        img {
            width: 100%;
            padding: 0 0.15rem;
        }
    }
}
.sy-cooperation {
    color: black;
}
.sy-footers {
    line-height: 1.6rem;
    padding: 1.8rem 0;
    font-weight: 700;
}
</style>

