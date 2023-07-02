<template>
    <form @submit.prevent class="d-flex flex-direction-column">
        <div class="pt-25 pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            카드번호
        </div>
        <div class="d-flex pb-25 pl-50 pr-50">
            <input v-model="cardNumber1" type="text" name="credit-card" class="w-25 mr-25" >
            <input v-model="cardNumber2" type="text" name="credit-card" class="w-25 mr-25">
            <input v-model="cardNumber3" type="text" name="credit-card" class="w-25 mr-25">
            <input v-model="cardNumber4" type="text" name="credit-card" class="w-25">
        </div>
        <small class="pr-50 d-flex justify-content-flex-end text-danger">
            {{ errorMessage.cardNumber }}
        </small>
        <div
            class="d-flex mt-50 pl-50 pr-50 justify-content-flex-end"
        >
            <button
                type="button"
                :disabled="isValidForm ? null : 'disabled'"
                @click="handleClickNext"
            >
                완료
            </button>
        </div>
    </form>
</template>
<script>
export default {
    name: 'SignupWizardStep3',
    model: {
        prop: 'userInfo',
        event: 'update:userInfo'
    },
    props: {
        userInfo: {
            type: Object,
            default: function () {
                return {
                    cardNumber1: '',
                    cardNumber2: '',
                    cardNumber3: '',
                    cardNumber4: ''
                }
            }
        }
    },
    data () {
        return {
            rules: {
                cardNumber: [
                    /^\d{4}$/
                ]
            },
            inputModel: {
                cardNumber1: '',
                cardNumber2: '',
                cardNumber3: '',
                cardNumber4: ''
            },
            errorMessage: {
                cardNumber: ''
            },
            isValidForm: false
        }
    },
    created () {
        this.cardNumber1 = this.userInfo.cardNumber1
        this.cardNumber2 = this.userInfo.cardNumber2
        this.cardNumber3 = this.userInfo.cardNumber3
        this.cardNumber4 = this.userInfo.cardNumber4
    },
    computed: {
        cardNumber1: {
            get () {
                return this.inputModel.cardNumber1
            },
            set (value) {
                this.inputModel.cardNumber1 = value
            }
        },
        cardNumber2: {
            get () {
                return this.inputModel.cardNumber2
            },
            set (value) {
                this.inputModel.cardNumber2 = value
            }
        },
        cardNumber3: {
            get () {
                return this.inputModel.cardNumber3
            },
            set (value) {
                this.inputModel.cardNumber3 = value
            }
        },
        cardNumber4: {
            get () {
                return this.inputModel.cardNumber4
            },
            set (value) {
                this.inputModel.cardNumber4 = value
            }
        },
        creditCardFullNumber () {
            return [this.cardNumber1, this.cardNumber2, this.cardNumber3, this.cardNumber4].join('')
        },
        isValidCardNumber () {
            return this.rules.cardNumber.every(regex =>
                regex.test(this.cardNumber1) &&
                regex.test(this.cardNumber2) &&
                regex.test(this.cardNumber3) &&
                regex.test(this.cardNumber4)
            )
        }
    },
    methods: {
        updateUserInfo () {
            this.$emit('update:userInfo', {
                cardNumber1: this.cardNumber1,
                cardNumber2: this.cardNumber2,
                cardNumber3: this.cardNumber3,
                cardNumber4: this.cardNumber4
            })
        },
        resetUserInfo () {
            this.$emit('update:userInfo', {
                cardNumber1: '',
                cardNumber2: '',
                cardNumber3: '',
                cardNumber4: ''
            })
        },
        handleClickNext () {
            this.$emit('next:page')
        },
        validateCardNumber (cardNumber) {
            if (cardNumber.length !== 16) return false
            let sum = 0
            for (let i = 15; i >= 0; i--) {
                let digit = parseInt(cardNumber[i], 10)
                if (i % 2 === 0) {
                    digit *= 2
                    if (digit >= 9) {
                        digit = Math.floor(digit / 10) + (digit % 10)
                    }
                }
                sum += digit
            }
            return sum % 10 === 0
        }
    },
    watch: {
        isValidForm: {
            handler (value) {
                if (value) {
                    this.updateUserInfo()
                } else {
                    this.resetUserInfo()
                }
            }
        },
        creditCardFullNumber: {
            handler (value) {
                if (this.validateCardNumber(value)) {
                    this.isValidForm = true
                    this.errorMessage.cardNumber = ''
                } else {
                    this.isValidForm = false
                    this.errorMessage.cardNumber = '유효한 카드번호 형식이 아닙니다.'
                }
            },
            deep: true
        }
    }
}
</script>
