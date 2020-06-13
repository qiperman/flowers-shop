<template>
  <div v-if="iconHtml"
       v-html="iconHtml"
       ref="icon"
       :class="iconClasses"
       @click="$emit('click')"
  >
    {{name}}
  </div>
</template>

<script>
const COMPONENT_CLASS = 'app-icon'

export default {
  name: 'AppIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: true
    },
    hoverColor: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return ['primary', 'success', 'warning', 'danger'].includes(value)
      }
    }
  },
  data () {
    return {
      iconHtml: null
    }
  },
  computed: {
    iconClasses () {
      const classes = [COMPONENT_CLASS]
      if (this.link) {
        classes.push(`${COMPONENT_CLASS}_link`)
        classes.push(`${COMPONENT_CLASS}_link-${this.hoverColor}`)
      }

      if (this.disabled) {
        classes.push(`${COMPONENT_CLASS}_disabled`)
      }

      return classes
    }
  },
  mounted () {
    try {
      this.iconHtml = require(`@/assets/icons/${this.name}.svg?inline`)
    } catch (e) {
      console.error(e.message)
      this.iconHtml = null
    }
  }
}
</script>

<style lang="scss">
  .app-icon{
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &_link{
      cursor: pointer;
    }

    $colors: (
      "primary": $color-primary,
      "success": $color-success,
      "danger": $color-danger,
      "warning": $color-warning
    );

    @each $name, $color in $colors {
      &_link-#{$name}:not(.app-icon_disabled):hover {
        color: $color;
      }
    }

    &_disabled{
      cursor: not-allowed;
      opacity: 0.5;
    }

    svg{
      fill: currentColor;
      max-width: 100%;
      height: 100%;
    }
  }
</style>
