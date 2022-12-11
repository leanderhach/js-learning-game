<div class="game-logo" class:animated={animated}>
    <div class="game-logo__left">
        <span>
            Out
        </span>
        <span>
            Past
        </span>
    </div>
    <div class="game-logo__right">
        <span>P</span><span>l</span><span>u</span><span>t</span><span>o</span>
    </div>
</div>


<script lang="ts">
    export let animated = false;
</script>

<style lang="scss">
    .game-logo {
        color: white;
        display:flex;

        &__left {
            display:flex;
            flex-direction: column;
            align-items: left;
            justify-content: center;
            font-size: 1.5em;

            span:first-of-type {
                font-weight: 100;
            }
        }

        &__right {
            font-weight: 200;
            font-size: 3.75em;
        }

        &.animated {
            .game-logo__left {
                span {
                    opacity: 0;
                }

                span:first-of-type {
                    animation: 3s loadingScreenOpacity forwards;
                }

                span:last-of-type {
                    animation: 3s 1.5s loadingScreenOpacity forwards;
                }
            }

            .game-logo__right {
                span {
                    opacity: 0;
                }

                span:nth-child(1) {
                    animation: 5s 2.5s loadingScreenOpacity forwards;
                }

                span:nth-child(2) {
                    animation: 5s 2.75s loadingScreenOpacity forwards;
                }

                span:nth-child(3) {
                    animation: 5s 3s loadingScreenOpacity forwards;
                }

                span:nth-child(4) {
                    animation: 5s 3.25s loadingScreenOpacity forwards;
                }

                span:nth-child(5) {
                    animation: 5s 3.5s loadingScreenOpacity forwards;
                }
            }
        }
    }

    @keyframes loadingScreenOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>