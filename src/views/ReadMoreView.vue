<script setup lang="ts">
import useArticleByIdReadMoreQuery from '@/composables/useArticleByIdReadMoreQuery'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import DeleteDialog from '@/components/DeleteDialog.vue'
import useDeleteArticleByIdMutate from '@/composables/useDeleteArticleByIdMutate'

const route = useRoute()
const router = useRouter()
const articleId = parseInt(route.params.articleId.toString(), 10)

const isDeleteModal = ref(false)

const { result } = useArticleByIdReadMoreQuery(articleId)
const article = computed(() => result.value?.articles[0])

const { mutate, onDone } = useDeleteArticleByIdMutate()

function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD')
}

function toggleDeleteModal() {
  isDeleteModal.value = !isDeleteModal.value
}

function onDelete() {
  mutate({ deleteArticleId: articleId })
}

onDone(() => router.go(-1))
</script>

<template>
  <DeleteDialog v-model="isDeleteModal" @on-click-delete="onDelete" />
  <div class="container mx-auto pt-7">
    <div v-if="article" class="w-full rounded-2xl overflow-hidden">
      <div class="bg-content-header p-3 text-xl font-semibold">{{ article.title }}</div>
      <div class="bg-content-body px-5 py-4 rounded-bl-2xl rounded-br-2">
        <div class="flex justify-center mb-8">
          <img :src="article.imageUrl" alt="Article's Image" class="rounded-2xl" />
        </div>
        <div class="text-xl mb-32">{{ article.description }}</div>
        <div class="flex justify-between items-center">
          <div class="text-xl">
            <span class="font-bold"> ปล่อยวันที่ : </span>
            <span class="font-thin">{{ formatDate(article.createdDate) }}</span>
            <span class="font-bold"> โดย </span>
            <span>{{ article.authorName }}</span>
          </div>
          <div class="flex gap-3">
            <RouterLink :to="{ name: 'article-edit', params: { articleId } }">
              <div
                class="bg-primary w-40 py-3 rounded-lg text-white text-xl font-extrabold text-center"
              >
                Edit
              </div>
            </RouterLink>
            <button
              @click="toggleDeleteModal"
              class="bg-danger w-40 py-3 rounded-lg text-white text-xl font-extrabold text-center"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <LoadingIndicator v-else />

    <div
      class="w-full rounded-2xl overflow-hidden mt-10"
      v-if="article?.comments && article.comments.length > 0"
    >
      <div class="bg-primary text-white font-semibold p-3 text-xl">Comments</div>
      <div class="bg-content-body divide-y divide-black">
        <div class="px-5 py-6" v-for="comment in article?.comments" :key="comment.commentId">
          {{ comment.message }}
        </div>
      </div>
    </div>
    <div v-else class="mt-10">No comments</div>
  </div>
</template>
