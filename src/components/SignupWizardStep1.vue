<template>
    <form @submit.prevent class="d-flex flex-direction-column">
        <div class="pt-25 pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            <label for="email">이메일</label>
            <input v-model="email" type="email" id="email" name="email" required>
        </div>
        <small class="pr-50 d-flex justify-content-flex-end text-danger">
            {{ errorMessage.email }}
        </small>
        <div class="pt-25 pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            <label for="password">비밀번호</label>
            <input v-model="password" type="password" id="password" name="password" required>
        </div>
        <small class="pr-50 d-flex justify-content-flex-end text-danger">
            {{ errorMessage.password }}
        </small>
        <div class="pt-25 pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            <label for="confirm_password">비밀번호 확인</label>
            <input v-model="confirmPassword" type="password" id="confirm_password" name="confirm_password" required>
        </div>
        <small class="pr-50 d-flex justify-content-flex-end text-danger">
            {{ errorMessage.confirmPassword }}
        </small>
        <div
            class="d-flex mt-50 pl-50 pr-50 justify-content-flex-end"
        >
            <button
                :disabled="isValidForm ? null : 'disabled'"
                type="button"
                @click="handleClickNext"
            >
                다음
            </button>
        </div>
    </form>
</template>
<script>
export default {
    name: 'SignupWizardStep1',
    model: {
        prop: 'userInfo',
        event: 'update:userInfo'
    },
    props: {
        userInfo: {
            type: Object,
            default: function () {
                return {
                    email: '',
                    password: '',
                    confirmPassword: ''
                }
            }
        }
    },
    data () {
        return {
            rules: {
                email: [
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                ],
                password: [
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                ]
            },
            inputModel: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            errorMessage: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    created () {
        this.email = this.userInfo.email
        this.password = this.userInfo.password
        this.confirmPassword = this.userInfo.confirmPassword
    },
    computed: {
        email: {
            get () {
                return this.inputModel.email
            },
            set (value) {
                this.inputModel.email = value
            }
        },
        password: {
            get () {
                return this.inputModel.password
            },
            set (value) {
                this.inputModel.password = value
            }
        },
        confirmPassword: {
            get () {
                return this.inputModel.confirmPassword
            },
            set (value) {
                this.inputModel.confirmPassword = value
            }
        },
        isValidEmail () {
            return this.rules.email.every(regex => regex.test(this.email))
        },
        isValidPassword () {
            return this.rules.password.every(regex => regex.test(this.password))
        },
        isValidConfirmPassword () {
            return this.password === this.confirmPassword
        },
        isValidForm () {
            return this.isValidEmail && this.isValidPassword && this.isValidConfirmPassword
        }
    },
    methods: {
        updateUserInfo () {
            this.$emit('update:userInfo', {
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            })
        },
        resetUserInfo () {
            this.$emit('update:userInfo', {
                email: '',
                password: '',
                confirmPassword: ''
            })
        },
        handleClickNext () {
            this.$emit('next:page')
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
        email: {
            handler () {
                this.errorMessage.email = this.isValidEmail ? '' : '유효한 이메일 형식이 아닙니다.'
            }
        },
        password: {
            handler () {
                this.errorMessage.password = this.isValidPassword ? '' : '유효한 패스워드 형식이 아닙니다.'
            }
        },
        confirmPassword: {
            handler () {
                this.errorMessage.confirmPassword = this.isValidConfirmPassword ? '' : '유효한 패스워드 확인 형식이 아닙니다.'
            }
        }
    }
}
</script>
