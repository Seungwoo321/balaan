<template>
    <div id="app">
        <SignupWizard
            :steps="steps"
            :currentStep="currentStep"
        >
            <template slot="page1">
                <SignupWizardStep1
                    v-model="personalInfo"
                    :userInfo="personalInfo"
                    @next:page="nextPage"
                />
            </template>
            <template slot="page2">
                <SignupWizardStep2
                    v-model="shippingInfo"
                    :userInfo="shippingInfo"
                    @back:page="backPage"
                    @next:page="nextPage"
                />
            </template>
            <template slot="page3">
                <SignupWizardStep3
                    v-model="paymentInfo"
                    :userInfo="paymentInfo"
                    @back:page="backPage"
                    @next:page="nextPage"
                />
            </template>
        </SignupWizard>
        <p>
            {{ personalInfo }}
        </p>
        <p>
            {{ shippingInfo }}
        </p>
    </div>
</template>
<script>
import SignupWizard from './components/SignupWizard.vue'
import SignupWizardStep1 from './components/SignupWizardStep1.vue'
import SignupWizardStep2 from './components/SignupWizardStep2.vue'
import SignupWizardStep3 from './components/SignupWizardStep3.vue'
export default {
    components: {
        SignupWizard,
        SignupWizardStep1,
        SignupWizardStep2,
        SignupWizardStep3
    },
    data () {
        return {
            currentStep: 1,
            steps: [
                {
                    title: '1) 개인 정보 입력',
                    step: 1,
                    slot: 'page1'
                },
                {
                    title: '2) 배송지 정보 입력',
                    step: 2,
                    slot: 'page2'
                },
                {
                    title: '3) 결제 정보 입력',
                    step: 3,
                    slot: 'page3'
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
                postcode: '',
                address: '',
                detailAddress: '',
                extraAddress: ''
            },
            paymentInfo: {

            }
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
