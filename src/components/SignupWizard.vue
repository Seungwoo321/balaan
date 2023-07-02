<template>
    <div class="wizard">
        <div class="wizard__body">
            <div class="wizard__body__step">
                <div v-for="(step, index) in steps" :key="index">
                    <div v-if="currentStep === step.step">
                        <h4>
                            {{ step.title }}
                        </h4>
                        <slot :name="step.slot"></slot>
                    </div>
                </div>
            </div>
            <div class="wizard__body__actions">
                <slot name="action"></slot>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        currentStep: {
            type: Number,
            default: 0
        },
        steps: {
            type: Array,
            default: function () {
                return []
            }
        }
    }
}
</script>
