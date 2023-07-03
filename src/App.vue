<template>
    <div id="app">
        <SignupWizard
            :steps="steps"
            :currentStep="currentStep"
        >
            <template slot="step1">
                <SignupWizardStep1
                    v-model="personalInfo"
                    :userInfo="personalInfo"
                    @next:page="nextPage"
                />
            </template>
            <template slot="step2">
                <SignupWizardStep2
                    v-model="shippingInfo"
                    :userInfo="shippingInfo"
                    @back:page="backPage"
                    @next:page="nextPage"
                />
            </template>
            <template slot="step3">
                <SignupWizardStep3
                    v-model="paymentInfo"
                    :userInfo="paymentInfo"
                    @back:page="backPage"
                    @next:page="nextPage"
                />
            </template>
            <template slot="complete">
                <SignupWizardComplete
                    :name="shippingInfo.name"
                    :email="personalInfo.email"
                    :fullAddress="fullAddress"
                    :phoneNumber="shippingInfo.phoneNumber"
                />
            </template>
        </SignupWizard>
        <p v-if="currentStep === 3">
            유효한 카드번호 (테스트 데이터)
            <ul>
                <li>
                    4123-4567-8901-2349
                </li>
                <li>
                    4556-1234-5678-9122
                </li>
                <li>
                    6011-2233-4455-6677
                </li>
                <li>
                    5432-1098-7654-3212
                </li>
                <li>
                    3782-2468-9753-2146
                </li>
                <li>
                    8888-2222-3333-4440
                </li>
            </ul>
        </p>
    </div>
</template>
<script>
import SignupWizard from './components/SignupWizard.vue'
import SignupWizardStep1 from './components/SignupWizardStep1.vue'
import SignupWizardStep2 from './components/SignupWizardStep2.vue'
import SignupWizardStep3 from './components/SignupWizardStep3.vue'
import SignupWizardComplete from './components/SignupWizardComplete.vue'
export default {
    components: {
        SignupWizard,
        SignupWizardStep1,
        SignupWizardStep2,
        SignupWizardStep3,
        SignupWizardComplete
    },
    data () {
        return {
            currentStep: 1,
            steps: [
                {
                    title: '1) 개인 정보 입력',
                    step: 1,
                    slot: 'step1'
                },
                {
                    title: '2) 배송지 정보 입력',
                    step: 2,
                    slot: 'step2'
                },
                {
                    title: '3) 결제 정보 입력',
                    step: 3,
                    slot: 'step3'
                },
                {
                    title: '회원가입이 완료되었습니다',
                    step: 4,
                    slot: 'complete'
                }
            ],
            personalInfo: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            shippingInfo: {
                name: '',
                phoneNumber: '',
                address: {
                    postcode: '',
                    base: '',
                    extra: ''
                },
                detailAddress: ''
            },
            paymentInfo: {
                cardNumber1: '',
                cardNumber2: '',
                cardNumber3: '',
                cardNumber4: ''
            }
        }
    },
    computed: {
        fullAddress () {
            return `(${this.shippingInfo.address.postcode}) ${this.shippingInfo.address.base} ${this.shippingInfo.detailAddress} ${this.shippingInfo.address.extra}`
        }
    },
    methods: {
        backPage () {
            this.currentStep -= 1
        },
        nextPage () {
            this.currentStep += 1
        }
    }
}
</script>
<style>

</style>
