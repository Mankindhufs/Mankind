// base64로 파일 문자열 localstorage에 저장
export const fileSave = (file: File) => {
  const reader = new FileReader();

  reader.onload = (savedfile) => {
    const base64 = savedfile.target?.result;
    const fileMeta = {
      name: file.name,
      type: file.type,
      data: base64,
    };

    localStorage.setItem('uploadedPDF', JSON.stringify(fileMeta));
  };

  reader.readAsDataURL(file);
};

export const getPDFfile = () => {
  try {
    const savedData = localStorage.getItem('uploadedPDF');

    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (err) {
    console.log('Parsing Error: ', err);
    return null;
  }
};

export const removePDFfile = () => {
  localStorage.removeItem('uploadedPDF');
};

// 약관 전문 보기 위한 blob url 생성
export const getBlobUrl = (base64string: string, mime: string) => {
  const base64 = base64string.split(',')[1];
  const byteString = atob(base64.replace(/\s/g, ''));
  const len = byteString.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([view], { type: mime });
  const url = URL.createObjectURL(blob);

  return url;
};
