<template>
    <div>
        <h3>"{{ name }}"님의 회원가입을 축하합니다.</h3>
        <div>
            <p>이메일: {{ email }}</p>
            <p>주소: {{ fullAddress }}</p>
            <p>연락처: {{ phoneNumber }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SignupWizardComplete',
    props: {
        name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        fullAddress: {
            type: String,
            default: ''
        },
        phoneNumber: {
            type: String,
            default: ''
        }
    }
}
</script>
