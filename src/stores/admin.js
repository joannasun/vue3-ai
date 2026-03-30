import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("admin", () => {
   const isExpand = ref(true)
   
   const toggleCollapse = () => {
        isExpand.value = !isExpand.value
    }
    
    return {
        isExpand,
        toggleCollapse
    }

})
