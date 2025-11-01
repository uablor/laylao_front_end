
import { useI18n } from "vue-i18n";
import { HotelService } from "@/infrastructure/services/hotel.service";
import { message } from "ant-design-vue";
import {
  CreateHotelCredentialsDto,
  UpdateHotelCredentialsDto,
} from "@/application/dto/hotel.dto";
import { storeToRefs } from "pinia";
import { useHotelStore } from "../stores/hotel.store";
import { computed } from "vue";

import { handleApiError } from "@/shared/utils/error";
import { HotelPaginationParams } from "@/domain/entities/hotel.entity";

export function useHotel() {
  const { t } = useI18n();
  const {HotelList, loading, query, selectedHotel, hotelDetails} =  storeToRefs(useHotelStore());


  const findallWithPagination = async () => {
    try {
      loading.value = true;
      const res = await HotelService.findallWithPagination(query.value);
      if (res && res.data && Array.isArray(res.data)) {
        HotelList.value = res
      } else {
        HotelList.value.data = [];
      }
    } catch (err) {
      message.error(t("failed"));
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const setQuery = (q: Partial<HotelPaginationParams>) => {
    const { page, ...query_not_page } = q;
    query.value = { ...query.value, ...query_not_page };
    if (page !== undefined && page !== null && !isNaN(Number(page))) {
      query.value.page = Number(page);
    }
    findallWithPagination();
  };

  const fetchHotel = async (id: number) => {
    try {
      loading.value = true;
      const res = await HotelService.findOne(id);
      selectedHotel.value = res.result;
      console.log(selectedHotel.value);
    } catch (err) {
      message.error(t("failed"));
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };


  const findOneHotelDetails = async (id: number) => {
    try {
      loading.value = true;
      const res = await HotelService.findOneHotelDetails(id);
      hotelDetails.value = res.result;
    } catch (err) {
      message.error(t("failed"));
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const createHotel = async (data: CreateHotelCredentialsDto) => {
    try {
      loading.value = true;
      const res = await HotelService.create(data);
      message.success(t("hotel")+t("create")+ t("success"));
      findallWithPagination();
      return res;
    } catch (err) {
      handleApiError(err, t);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateHotel = async (data: UpdateHotelCredentialsDto) => {
    try {
      loading.value = true;
      const res = await HotelService.update(data);
      message.success(t("hotel")+t("update")+ t("success"));
      findallWithPagination();
      return res;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const deleteHotel = async (id: number) => {
    try {
      loading.value = true;
      await HotelService.delete(id);
      message.success(t("hotel")+t("delete")+ t("success"));;
      findallWithPagination();
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading : computed(() => loading.value),
    HotelList : computed(() => HotelList.value),
    selectedHotel : computed(() => selectedHotel.value),
    query : computed(() => query.value),
    findallWithPagination,
    setQuery,
    fetchHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    findOneHotelDetails
  };
}
