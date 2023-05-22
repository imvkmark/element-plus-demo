<template>
    <AisInstantSearch index-name="console" :search-client="searchClient">
        <AisSearchBox
            spellcheck="false"
            :autofocus="true"
            type="search"
        >
            <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                <form class="DocSearch-Form" @submit.prevent>
                    <label
                        class="DocSearch-MagnifierLabel"
                        for="docsearch-input"
                        id="docsearch-label"
                    >
                        <svg
                            width="20"
                            height="20"
                            class="DocSearch-Search-Icon"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                                stroke="currentColor"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </label>
                    <DebouncedInput
                        type="search"
                        class="DocSearch-Input"
                        placeholder="搜索文档"
                        autofocus
                        :value="currentRefinement"
                        @change="v => refine(v)"
                        @reset="cleanSearch"
                        ref="input"
                    />
                    <span v-show="isSearchStalled">Loading...</span>
                </form>
            </template>
        </AisSearchBox>
        <AisStateResults>
            <template v-slot="{ results: { hits, query } }">
                <AisInfiniteHits v-if="query.length > 0 && hits.length > 0">
                    <template v-slot="{items,refineNext,isLastPage}">
                        <div class="search-list">
                            <div
                                v-for="(group, groupKey) of GroupBy(items, (x) => x.pageTitle)"
                                :key="groupKey"
                            >
                                    <span class="search-group">
                                      <a :href="group[0].pageLink">{{
                                              groupKey
                                                  ? groupKey.toString()[0].toUpperCase() +
                                                  groupKey.toString().slice(1)
                                                  : "主页"
                                          }}</a>
                                    </span>
                                <SearchItem
                                    v-for="item in group"
                                    :key="item.id"
                                    :item="item"
                                    :origin="origin"
                                    @click="cleanSearch"
                                />
                            </div>
                            <div v-if="!isLastPage" class="show-more">
                                <button class="btn-show-more" @click="refineNext">
                                    显示更多结果
                                </button>
                            </div>
                        </div>
                    </template>
                </AisInfiniteHits>
                <div v-else-if="query.length > 0" class="state-text">
                    找不到和您查询的 “{{ query }}” 相符的内容或信息。
                </div>
                <div v-else>

                </div>
            </template>
        </AisStateResults>

    </AisInstantSearch>
</template>

<script setup lang="ts">
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { AisInstantSearch, AisSearchBox, AisStateResults, AisInfiniteHits } from 'vue-instantsearch/vue3/es';
import { ref } from "vue";
import DebouncedInput from "@/components/search/DebouncedInput.vue";
import SearchItem from "@/components/search/SearchItem.vue";

const searchClient = instantMeiliSearch(
    'https://api.unistory.cn:7770/',
    '7704d487188ba57c57b079dff1e5456a3db25f83a1e302de773e9e9ff3df017e',
    {
        finitePagination: true,
    })
const emit = defineEmits(["close"]);

const searchTerm = ref();
const origin = ref("");
const input = ref()

function GroupBy(array, func) {
    if (!array || !array.length) return [];

    return array.reduce((acc, value) => {
        // Group initialization
        if (!acc[func(value)]) {
            acc[func(value)] = [];
        }

        // Grouping
        acc[func(value)].push(value);

        return acc;
    }, {});
};


function cleanSearch() {
    searchTerm.value = "";
    emit("close");
}

defineExpose({
    focus: () => input.value?.focus(),
    clear: () => (searchTerm.value = ""),
});
</script>

<style scoped lang="less">

.home-container {
    text-align: center;
    padding-top: 20px;
    .logo {
        width: 20%;
    }
}
</style>
