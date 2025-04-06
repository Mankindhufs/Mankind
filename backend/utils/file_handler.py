import os

def save_uploaded_file(file, upload_folder):
    """
    업로드된 파일을 지정된 폴더에 저장합니다.
    :param file: werkzeug FileStorage 객체
    :param upload_folder: 저장할 폴더 경로
    :return: 저장된 파일 경로
    """
    filename = file.filename
    save_path = os.path.join(upload_folder, filename)
    file.save(save_path)
    return save_path
