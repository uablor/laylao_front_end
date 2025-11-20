import { useAuthStore } from "@/presentation/stores/auth.store";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { token, rolesArray } = storeToRefs(useAuthStore());
  const isAuthenticated = !!token.value;
  const isLoginPage = to.name === "auth.Login";

  // ถ้าเป็นหน้า login และ login แล้ว → redirect ไปหน้าที่เหมาะสม
  if (isLoginPage && isAuthenticated) {
    return next({ name: getDashboardByRole(rolesArray.value) });
  }

  // ถ้ายังไม่ login และไม่ใช่หน้า login → redirect ไป login
  if (!isAuthenticated && !isLoginPage) {
    return next({ name: "auth.Login" });
  }

  // ถ้าเป็นหน้า login และยังไม่ login → ให้ผ่าน
  if (isLoginPage && !isAuthenticated) {
    return next();
  }

  // ถ้า route ไม่ต้องการตรวจสอบ auth หรือไม่มีการกำหนด roles → ให้ผ่าน
  if (to.meta.skipAuthCheck || !to.meta.roles || !Array.isArray(to.meta.roles)) {
    return next();
  }

  // ตรวจสอบ permission
  const allowedRoles = to.meta.roles as string[];
  const hasPermission = rolesArray.value.some((userRole: string) =>
    allowedRoles.includes(userRole)
  );

  if (!hasPermission) {
    return next({ name: "authorized" });
  }

  // ถ้ามี permission → ให้ผ่าน
  return next();
}

// Helper function สำหรับหา dashboard ที่เหมาะสมตาม role
function getDashboardByRole(roles: string[]): string {
  if (
    roles.includes(BaseRole.SUPER_ADMIN) ||
    roles.includes(BaseRole.ADMIN)
  ) {
    return "admin.dashboard";
  }
  
  if (
    roles.includes(BaseRole.ADMIN_HOTEL) ||
    roles.includes(BaseRole.USER_HOTEL)
  ) {
    return "admin-hotel.dashboard";
  }
  
  return "authorized";
}