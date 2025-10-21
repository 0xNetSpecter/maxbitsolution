<script setup lang="ts">
import PosterImage from "@/components/common/PosterImage.vue";
import { useMoviesStore } from "@/stores/movies";

const store = useMoviesStore();

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

function handleClick() {
  store.setLast(props.movie);
}
</script>

<template>
  <div
    class="group bg-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer"
  >
    <div class="overflow-hidden relative">
      <PosterImage
        :src="movie.posterImage"
        :alt="movie.title"
        class="w-full h-80 transition-transform duration-300 ease-out group-hover:scale-105"
        cover
      />
      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>

    <div class="p-4 flex flex-col gap-2">
      <h2 class="text-xl font-semibold text-white">{{ movie.title }}</h2>

      <p class="text-gray-400 text-sm">
        {{ movie.year }} – {{ movie.lengthMinutes }} мин
      </p>

      <p class="text-yellow-400 font-bold">★ {{ movie.rating }}</p>

      <p class="text-gray-300 text-sm line-clamp-3">
        {{ movie.description }}
      </p>

      <UButton
        :to="`/movies/${movie.id}`"
        class="mt-3"
        color="primary"
        size="sm"
        block
        @click="handleClick"
      >
        Просмотреть сеансы
      </UButton>
    </div>
  </div>
</template>
