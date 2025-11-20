export function toFormData<T extends Record<string, any>>(
  data: T,
  files?: File[],
  fileField = "files",
  excludeKeys: string[] = [] // <-- เพิ่ม parameter
): FormData {
  const formData = new FormData();

  // Append files first
  files?.forEach((file) => formData.append(fileField, file));

  // Append fields
  Object.entries(data).forEach(([key, value]) => {
    // Skip null, undefined, file field, or excluded keys
    if (value === undefined || value === null || key === fileField || excludeKeys.includes(key)) {
      return;
    }

    // Handle different data types
    if (Array.isArray(value)) {
      // Option: JSON string
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === 'boolean') {
      formData.append(key, value.toString());
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}


// Alternative: Deep serialization with dot notation
export function toFormDataDeep<T extends Record<string, any>>(
  data: T,
  files?: File[],
  fileField = "files",
  parentKey = ""
): FormData {
  const formData = new FormData();

  // Append files
  if (!parentKey) {
    files?.forEach((file) => formData.append(fileField, file));
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || key === fileField) {
      return;
    }

    const formKey = parentKey ? `${parentKey}.${key}` : key;

    if (value instanceof File) {
      formData.append(formKey, value);
    } else if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (Array.isArray(value)) {
      // Append array items with indexed keys: field[0], field[1]
      value.forEach((item, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (typeof item === 'object' && !(item instanceof File)) {
          formData.append(arrayKey, JSON.stringify(item));
        } else {
          formData.append(arrayKey, String(item));
        }
      });
    } else if (typeof value === 'object') {
      // Recursively handle nested objects with dot notation
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        toFormDataDeep(
          { [nestedKey]: nestedValue },
          undefined,
          fileField,
          formKey
        );
      });
    } else {
      formData.append(formKey, String(value));
    }
  });

  return formData;
}
