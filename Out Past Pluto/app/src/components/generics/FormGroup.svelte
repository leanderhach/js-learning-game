<div class="form-group">
    <input type={type} id={id}>
    <label for={id}>{label}</label>
    <span class="form-group__hint">{hint}</span>
</div>

<script lang="ts">
    export let type = "text";
    export let label: string;
    export let hint: string;
    export let id: string;
</script>

<style lang="scss">
    input {
        background-color: var(--primary-background-color);
        border: 1px solid var(--brand-purple);
    }
</style>