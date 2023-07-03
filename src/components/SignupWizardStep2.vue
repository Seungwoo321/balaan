<template>
    <form @submit.prevent class="d-flex flex-direction-column">
        <div class="pt-25 pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            <label for="name">이름</label>
            <input v-model="name" type="text" id="name" name="name" required>
        </div>
        <small class="pr-50 d-flex justify-content-flex-end text-danger">
            {{ errorMessage.name }}
        </small>

        <div class="pt-25 pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            <label for="phone">연락처</label>
            <input v-model="phoneNumber" type="text" name="phone" id="phone">
        </div>
        <small class="pr-50 d-flex justify-content-flex-end text-danger">
            {{ errorMessage.phoneNumber }}
        </small>

        <div class="pt-25 pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            <label for="address">주소</label>
            <div>
                <input v-model="address.postcode" class="mr-25" type="text" name="postcode" id="postcode" placeholder="우편번호" readonly>
                <button type="button" @click="execDaumPostcode">우편번호 찾기</button>
            </div>
        </div>
        <div class="d-flex pb-25 pl-50 pr-50">
            <input v-model="address.base" class="w-100" type="text" name="address" id="address" placeholder="주소" readonly>
        </div>
        <div class="pb-25 pl-50 pr-50 d-flex justify-content-space-between">
            <input ref="detailAddressInput" v-model="detailAddress" class="w-100 mr-25" type="text" name="detailAddress" id="detailAddress" placeholder="상세주소">
            <input v-model="address.extraAddress" class="w-100" type="text" name="extraAddress" id="extraAddress" placeholder="참고항목" readonly>
        </div>
        <small class="pr-50 d-flex justify-content-flex-end text-danger">
            {{ errorMessage.address }}
        </small>
        <div
            class="d-flex mt-50 pl-50 pr-50 justify-content-space-between"
        >
            <button
                type="button"
                @click="handleClickBack"
            >
                이전
            </button>
            <button
                type="button"
                :disabled="!isValidForm"
                @click="handleClickNext"
            >
                다음
            </button>
        </div>
    </form>
</template>
<script>
export default {
    name: 'SignupWizardStep2',
    model: {
        prop: 'userInfo',
        event: 'update:userInfo'
    },
    props: {
        userInfo: {
            type: Object,
            default: function () {
                return {
                    name: '',
                    phoneNumber: '',
                    address: {
                        postcode: '',
                        base: '',
                        extra: ''
                    },
                    detailAddress: ''
                }
            }
        }
    },
    data () {
        return {
            rules: {
                name: [
                    /^[가-힣]{2,}$|^[a-zA-Z]{3,}$/
                ],
                phoneNumber: [
                    /^0\d{2}[ -]?\d{3,4}[ -]?\d{4}$/
                ]
            },
            errorMessage: {
                name: '',
                phoneNumber: '',
                address: ''
            }
        }
    },
    mounted () {
        this.$_loadDaumPostCode()
    },
    beforeDestroy () {
        this.$_unloadDaumPostCode()
    },
    computed: {
        name: {
            get () {
                return this.userInfo.name
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    name: value
                })
            }
        },
        phoneNumber: {
            get () {
                return this.userInfo.phoneNumber
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    phoneNumber: value
                })
            }
        },
        detailAddress: {
            get () {
                return this.userInfo.detailAddress
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    detailAddress: value
                })
            }
        },
        address: {
            get () {
                return this.userInfo.address
            },
            set (value) {
                this.$emit('update:userInfo', {
                    ...this.userInfo,
                    address: value
                })
            }
        },
        isValidName () {
            return this.rules.name.every(regex => regex.test(this.name))
        },
        isValidPhoneNumber () {
            return this.rules.phoneNumber.every(regex => regex.test(this.phoneNumber))
        },
        isValidAddress () {
            return this.address.postcode && this.address.base
        },
        isValidForm () {
            return !!(this.isValidName && this.isValidPhoneNumber && this.isValidAddress)
        }
    },
    methods: {
        execDaumPostcode () {
            const daum = this.$_daum
            new daum.Postcode({
                oncomplete: (data) => {
                    let address = ''
                    let extraAddress = ''
                    if (data.userSelectedType === 'R') {
                        address = data.roadAddress
                    } else {
                        address = data.jibunAddress
                    }
                    if (data.userSelectedType === 'R') {
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddress += data.bname
                        }
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName)
                        }
                        if (extraAddress !== '') {
                            extraAddress = ' (' + extraAddress + ')'
                        }
                    } else {
                        extraAddress = ''
                    }
                    this.address = {
                        base: address,
                        postcode: data.zonecode,
                        extra: extraAddress
                    }
                    this.$refs.detailAddressInput.focus()
                }
            }).open()
        },
        handleClickBack () {
            this.$emit('back:page')
        },
        handleClickNext () {
            this.$emit('next:page')
        }
    },
    watch: {
        name: {
            handler () {
                this.errorMessage.name = this.isValidName ? '' : '유효한 이름 형식이 아닙니다. (2글자 이상의 한글 혹은 3글자 이상의 알파벳)'
            }
        },
        phoneNumber: {
            handler () {
                this.errorMessage.phoneNumber = this.isValidPhoneNumber ? '' : '유효한 연락처 형식이 아닙니다.'
            }
        }
    }
}
</script>
