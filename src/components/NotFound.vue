<template>
    <div class="notfond">
        <div class="moon"></div>
        <div class="moon__crater moon__crater1"></div>
        <div class="moon__crater moon__crater2"></div>
        <div class="moon__crater moon__crater3"></div>
        <div class="star star1"></div>
        <div class="star star2"></div>
        <div class="star star3"></div>
        <div class="star star4"></div>
        <div class="star star5"></div>
        <div id="error-page">
            <div class="content">
                <h2 class="header" data-text="404">404</h2>
                <h4 class="sub_header" data-text="Opps! Page not found">Opps! Page not found</h4>
                <p class="description">
                    Sorry, the page you're looking for doesn't exist. If you think something is broken, report a
                    problem.
                </p>
                <div class="btns">
                    <el-button type="primary" @click="goHome">Return Home</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        function goHome() {
            router.push({ name: "home" });
        }
        return { goHome };
    },
};
</script>

<style scoped>
.notfond {
    height: 90vh;
    background: linear-gradient(90deg, rgba(47, 54, 64, 1) 23%, rgba(24, 27, 32, 1) 100%);
}
.moon {
    background: linear-gradient(90deg, rgba(208, 208, 208, 1) 48%, rgba(145, 145, 145, 1) 100%);
    position: absolute;
    top: -100px;
    left: -300px;
    width: 900px;
    height: 900px;
    content: "";
    border-radius: 100%;
    box-shadow: 0px 0px 30px -4px rgba(0, 0, 0, 0.5);
}

.moon__crater {
    position: absolute;
    content: "";
    border-radius: 100%;
    background: linear-gradient(90deg, rgba(122, 122, 122, 1) 38%, rgba(195, 195, 195, 1) 100%);
    opacity: 0.6;
}

.moon__crater1 {
    top: 250px;
    left: 500px;
    width: 60px;
    height: 180px;
}

.moon__crater2 {
    top: 650px;
    left: 340px;
    width: 40px;
    height: 80px;
    transform: rotate(55deg);
}

.moon__crater3 {
    top: -20px;
    left: 40px;
    width: 65px;
    height: 120px;
    transform: rotate(250deg);
}

.star {
    background: grey;
    position: absolute;
    width: 5px;
    height: 5px;
    content: "";
    border-radius: 100%;
    transform: rotate(250deg);
    opacity: 0.4;
    animation-name: shimmer;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

.star1 {
    top: 40%;
    left: 50%;
    animation-delay: 1s;
}

.star2 {
    top: 60%;
    left: 90%;
    animation-delay: 3s;
}

.star3 {
    top: 10%;
    left: 70%;
    animation-delay: 2s;
}

.star4 {
    top: 90%;
    left: 40%;
}

.star5 {
    top: 20%;
    left: 30%;
    animation-delay: 0.5s;
}
.error-page {
    justify-items: center;
    align-items: center;
}
.content {
    position: absolute;
    font-family: "Righteous", cursive;
    color: #363e49;
    margin-left: 100px;
}
.header {
    font-size: 10em;
}

.sub_header {
    font-size: 2em;
}

.description {
    opacity: 0.5;
}
</style>
