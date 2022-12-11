<div class="spinner">
    <div class="spinner__circle"></div>
    <div class="spinner__circle"></div>
    <div class="spinner__circle"></div>
    <div class="spinner__center"></div>
</div>

<style lang="scss">
    .spinner {
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 1.5em;
        width: 1.5em;

        &__circle{
            position: absolute;
            top:0;
            border-radius: 1em;
            overflow:hidden;

            &::before, &::after {
                position: absolute;
                width: 100%;
                height: 50%;
                content: "";
            }

            &::before {
                top: 0;
            }

            &::after {
                bottom: 0;
                background-color: var(--primary-background-color);
            }

            &:nth-child(3) {
                margin-top: 0.25em;
                height: 1em;
                width: 1em;
                animation: 2s spinCircle linear infinite;

                &::before {
                    background-color: #4D255E;
                }
            }

            &:nth-child(2) {
                margin-top: 0.13em;
                height: 1.25em;
                width: 1.25em;
                animation: 2.5s spinCircle linear infinite;

                &::before {
                    background-color: #74388E;
                }
            }

            &:nth-child(1) {
                height: 1.5em;
                width: 1.5em;
                animation: 2s spinCircle linear infinite;

                &::before {
                    background-color: var(--brand-purple);
                }
            }
        }

        &__center {
            height: 0.75em;
            width: 0.75em;
            background-color: var(--primary-background-color);
            z-index:2;
            border-radius: 50%;
        }
    }

    @keyframes spinCircle {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>