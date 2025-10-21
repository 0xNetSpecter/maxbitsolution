<script setup lang="ts">
const {
  public: { imageBase },
} = useRuntimeConfig();

const props = defineProps<{
  src: string | null | undefined;
  alt?: string;
  cover?: boolean;
}>();

const fullSrc = computed(() => {
  if (!props.src) return "/no-poster.jpg";
  const base = String(imageBase || "").replace(/\/$/, "");
  const path = props.src.replace(/^\//, "");
  return base ? `${base}/${path}` : `/${path}`;
});

function onError(e: Event) {
  (e.target as HTMLImageElement).src = "/no-poster.jpg";
}

console.log(props.src);
</script>

<template>
  <img
    v-bind="$attrs"
    :src="fullSrc"
    :alt="alt"
    :class="cover ? 'object-cover' : 'object-contain'"
    loading="lazy"
    decoding="async"
    @error="onError"
  />
</template>
