import { useAuthStore } from "@/presentation/stores/auth.store";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { role, token } = storeToRefs(useAuthStore());

  if (to.meta.skipAuthCheck) {
    if (token.value && to.name === "auth.Login") {
      return next({ name: "admin.dashboard" });
    }

    if (!token.value && to.name !== "auth.Login") {
      return next({ name: "auth.Login" });
    }
    // if (to.meta.roles && Array.isArray(to.meta.roles)) {
    //   const allowedRoles = to.meta.roles as string[];
    //   if (!allowedRoles.includes(role.value)) {
    //     return next({ name: "authorized" });
    //   }
    //   if (role.value.includes(BaseRole.SUPER_ADMIN || BaseRole.ADMIN)) {
    //     return next({ name: "admin.dashboard" });
    //   }
    //   if (role.value.includes(BaseRole.USER_HOTEL || BaseRole.ADMIN_HOTEL)) {
    //     return next({ name: "admin.hotel" });
    //   } else {
    //     return next({ name: "authorized" });
    //   }
    // }
    return next();
  }
  if (token.value) {
    if (to.name === "auth.Login") {
      return next({ name: "admin.dashboard" });
    }
    // if (to.meta.roles && Array.isArray(to.meta.roles)) {
    //   const allowedRoles = to.meta.roles as string[];
    //   if (!allowedRoles.includes(role.value)) {
    //     return next({ name: "authorized" });
    //   }
    //   if (role.value.includes(BaseRole.SUPER_ADMIN || BaseRole.ADMIN)) {
    //     return next({ name: "admin.dashboard" });
    //   }
    //   if (role.value.includes(BaseRole.USER_HOTEL || BaseRole.ADMIN_HOTEL)) {
    //     return next({ name: "admin.hotel" });
    //   } else {
    //     return next({ name: "authorized" });
    //   }
    // }
    return next();
  }
  if (!to.meta.skipAuthCheck) {
    if (!token.value && to.name !== "auth.Login") {
      return next({ name: "auth.Login" });
    }
    if (to.meta.roles && Array.isArray(to.meta.roles)) {
      const allowedRoles = to.meta.roles as string[];
      if (!allowedRoles.includes(role.value)) {
        return next({ name: "authorized" });
      }
      if (role.value.includes(BaseRole.SUPER_ADMIN || BaseRole.ADMIN)) {
        return next({ name: "admin.dashboard" });
      }
      if (role.value.includes(BaseRole.USER_HOTEL || BaseRole.ADMIN_HOTEL)) {
        return next({ name: "admin.hotel" });
      } else {
        return next({ name: "authorized" });
      }
    }
    return next();
  } else {
    return next({ name: "auth.Login" });
  }
}
