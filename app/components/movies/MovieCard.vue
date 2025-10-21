<template>
  <div
    class="group shadow-xl relative bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition cursor-pointer"
  >
    <div class="overflow-hidden relative">
      <img
        :src="fullPoster"
        :alt="movie.title"
        class="w-full h-80 object-cover transition-transform duration-300 ease-out scale-101 group-hover:scale-105"
        loading="lazy"
      />

      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>

    <div class="p-4 flex flex-col gap-2">
      <h2 class="text-xl font-semibold text-white">{{ movie.title }}</h2>

      <p class="text-gray-400 text-sm">
        {{ movie.year }} - {{ movie.lengthMinutes }} мин
      </p>

      <p class="text-yellow-400 font-bold">★ {{ movie.rating }}</p>

      <p class="text-gray-300 text-sm line-clamp-3">
        {{ movie.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  public: { imageBase },
} = useRuntimeConfig();

const props = defineProps<{
  movie: {
    id: number;
    title: string;
    year: number;
    rating: number;
    posterImage: string;
    lengthMinutes: number;
    description: string;
  };
}>();

const fullPoster = computed(() => {
  const base = imageBase.replace(/\/$/, "");
  const path = props.movie.posterImage.replace(/^\//, "");
  return props.movie.posterImage.startsWith("http")
    ? props.movie.posterImage
    : `${base}/${path}`;
});
</script>
