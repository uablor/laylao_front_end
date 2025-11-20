<!-- <template>
  <a-drawer
    :title="data ? $t('edit') : $t('add')"
    :width="520"
    :open="localOpen"
    :maskClosable="false"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <template #title>
      <div class="text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <a-divider />
          <span
            class="text-sm font-semibold text-gray-400 uppercase tracking-wider"
          >
            {{ props.data ? $t("edit") : $t("add") }}
          </span>
          <a-divider />
        </div>
      </div>
    </template>

    <a-form
      layout="vertical"
      ref="formRef"
      :model="formState"
      :rules="RoomTypeRule"
      @finish="onSubmit"
      :loading="loadingRoomType"
    >
      <a-row gutter="[16,16]">
        <a-col :span="24">
          <FormInputString
            label="name"
            type="text"
            v-model="formState.name"
            :placeholder="$t('name') + ' ' + $t('roomtype')"
          />
        </a-col>
        <a-col
          :span="24"
          v-if="route.name !== 'admin.detailhotel' || !route.params.id"
        >
          <a-form-item :label="$t('hotel')" name="hotel">
            <a-select
              v-model:value="hotel_value"
              :placeholder="$t('select_hotel')"
              style="width: 100%"
            >
              <a-select-option
                v-for="hotel in hotelAll"
                :key="hotel.id"
                :value="hotel.id"
              >
                {{ hotel.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24">
          {{ $t("images") }}
          <a-upload
            name="images"
            list-type="picture-card"
            title="ກຳລັງໂຫຼດຮູບ"
            class="p-2"
            multiple
            :customRequest="uploadImage"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :show-upload-list="true"
            @change="handleChange"
            @remove="onRemove"
          >
            <div>
              <LoadingOutlined v-if="loading_image" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">ອັບໂຫຼດຮູບ</div>
            </div>
          </a-upload>
        </a-col>

        <a-col :span="24">
          <div class="flex justify-end gap-2 mt-2">
            <BaseButton @click="onClose">{{ $t("cancel") }}</BaseButton>
            <BaseButton
              type="primary"
              htmlType="submit"
              :loading="loadingRoomType"
            >
              {{ $t("save") }}
            </BaseButton>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import FormInputString from "@/components/FormInputString.vue";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useRoomType } from "@/presentation/composables/useRoomType";
import type {
  RoomType,
  RoomType_hotel_id,
} from "@/domain/entities/roomtype.entity";
import { RoomTypeRule } from "@/presentation/validator/RoomType";
import BaseButton from "@/components/BaseButton.vue";
import { useHotel } from "@/presentation/composables/useHotel";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import { storeToRefs } from "pinia";
import { useImage } from "@/presentation/composables/useImage";
import { PlusOutlined } from "@ant-design/icons-vue";
import { baseEnv } from "@/base.env";
import { useRoute } from "vue-router";
const {
  beforeUpload,
  loading_image,
  fileList,
  images,
  uploadImage,
  handleChange,
  onRemove,
} = useImage();
const { findall } = useHotel();
const { hotelAll } = storeToRefs(useHotelStore());
const props = defineProps<{ open: boolean; data: RoomType | null }>();
const emit = defineEmits(["isOpen", "onSaved"]);
const route = useRoute();
const formRef = ref();
const { createRoomType, updateRoomType, loading, findAllRoomType } =
  useRoomType();
const loadingRoomType = loading;

const formState = reactive<RoomType_hotel_id>({
  id: 0,
  name: "",
  hotel_id: 0,
  image_ids: [],
  images: [],
  createdAt: "",
  updatedAt: "",
});

const clear = () => {
  Object.assign(formState, {
    id: 0,
    name: "",
    description: "",
    hotel_id: 0,
    images: [],
    image_ids: [],
  });
};

const localOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit("isOpen", val),
});

const hotel_value = computed({
  get: () => {
    if (!formState.hotel_id) {
      return "";
    }
    return formState.hotel_id;
  },
  set: (val: number) => (formState.hotel_id = val),
});

const addImage = (value: RoomType) => {
  fileList.value =
    value.images?.map((img) => ({
      uid: String(img.id),
      name: baseEnv.IMAGE_URL + img.url,
      status: "done",
      url: baseEnv.IMAGE_URL + img.url,
    })) || [];
};

const isDetailHotelRoute = computed(
  () => route.name === "admin.detailhotel" && route.params.id
);

const currentHotelId = computed(() =>
  isDetailHotelRoute.value ? Number(route.params.id) : null
);

watch(
  () => props.data,
  async (value) => {
    if (value) {
      Object.assign(formState, value);
      formState.hotel_id = value?.hotel?.id || currentHotelId.value || 0;
      addImage(value);
      // if (route.name === "admin.detailhotel" && route.params.id) {
      //   formState.hotel_id = Number(route.params.id);
      // }
    } else {
      clear();
      fileList.value = [];
    }
  },
  { immediate: true}
);

const onClose = () => {
  formRef.value?.resetFields();
  images.value = [];
  clear();
  emit("isOpen", false);
};

const onSubmit = async () => {
  const existingImageIds = formState.images?.map((img) => img.id) || [];
  const newImageIds = images.value.map((item) => item.id);
  const allImageIds = [...new Set([...existingImageIds, ...newImageIds])];
  if (currentHotelId.value) {
    formState.hotel_id = currentHotelId.value;
  }

  if (route.name === "admin.detailhotel" && route.params.id) {
    get_hotel_id();
  }
  if (props.data) {
    const payload = {
      ...formState,
      image_ids: allImageIds,
    };
    await updateRoomType(payload);
  } else {
    const { id, createdAt, updatedAt, images, ...rest } = formState;
    const payload = {
      ...rest,
      image_ids: newImageIds,
    };
    await createRoomType(payload);
  }

  if (currentHotelId.value) {
    await findAllRoomType(currentHotelId.value);
  }
  fileList.value = [];
  emit("onSaved");
  onClose();
};

const get_hotel_id = () => {
  formState.hotel_id = Number(route.params.id);
};

onMounted(async () => {
  if (route.name === "admin.detailhotel" && route.params.id) {
    get_hotel_id();
  } else {
    await findall();
  }
});
</script> -->
