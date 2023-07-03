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
                :disabled="!isValidForm"
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
            errorMessage: {
                cardNumber: ''
            },
            isValidForm: false
        }
    },
    computed: {
        cardNumber1: {
            get () {
                return this.userInfo.cardNumber1
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    cardNumber1: value
                })
            }
        },
        cardNumber2: {
            get () {
                return this.userInfo.cardNumber2
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    cardNumber2: value
                })
            }
        },
        cardNumber3: {
            get () {
                return this.userInfo.cardNumber3
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    cardNumber3: value
                })
            }
        },
        cardNumber4: {
            get () {
                return this.userInfo.cardNumber4
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    cardNumber4: value
                })
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
        creditCardFullNumber: {
            handler (value) {
                if (this.validateCardNumber(value)) {
                    this.isValidForm = true
                    this.errorMessage.cardNumber = ''
                } else {
                    this.isValidForm = false
                    this.errorMessage.cardNumber = '유효한 카드번호 형식이 아닙니다.'
                }
            }
        }
    }
}
</script>
