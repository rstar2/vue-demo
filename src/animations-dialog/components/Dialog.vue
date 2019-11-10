<template>
  <transition name="fade" appear>
    <div class="dialog__overlay" role="dialog">
      <div class="dialog__box">
        <h2>Atten!</h2>
        <button @click="$emit('close')" autofocus>Close</button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">

$purple:               rgb(98, 9, 117);

@keyframes jump {
  0% {
    transform: translateY(250px) scale(0);
  }
  50% {
    transform: translateY(-10px) scale(1.2);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

$transition-duration: 0.5s;

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity $transition-duration ease;

  .dialog__box {
    animation: jump $transition-duration ease-in-out;
  }
}

.fade-leave-active {
  opacity: 0;
  transition: opacity $transition-duration ease;

  .dialog__box {
    animation: jump $transition-duration ease-in-out reverse;
    animation-fill-mode: backwards;
  }
}

.dialog {
  &__box {
    background: #f7f6ef;
    text-align: center;
    padding: 20px;
  }

  &__overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba($purple, 0.79);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
