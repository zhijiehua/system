/*
 * @Description: 上传图片
 * @Author: huazj
 * @Date: 2023-07-27 17:57:31
 * @LastEditTime: 2023-07-28 13:18:45
 * @LastEditors: huazj
 */
import React, { useState, useEffect, memo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import request from '@/request';
import {uploadImg} from '@/api/common';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImg: React.FC<{getfileList:Function, prevImgList:UploadFile<any>[]}> = ({getfileList, prevImgList = []}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // done 上传完成 uploading 上传中 error 上传失败
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  /**
   * @description: 关闭预览
   * @return {*}
   */  
  const handleCancel = () => setPreviewOpen(false);
  /**
   * @description: 打开预览
   * @return {*}
   * @param {UploadFile} file
   */  
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  }
  /**
   * @description: 自定义上传
   * @return {*}
   * @param {any} file
   */    
  const handleUpload = async (file:any) => {
    const {code, data} = await request(uploadImg, {file: file.file});
    setFileList([{
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: data,
    }])
  }
  useEffect(() => {
    getfileList(fileList)
  }, [fileList])
  useEffect(() => {
    setTimeout(() => {
      setFileList(prevImgList);
    });
  }, [prevImgList])

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>应用图标</div>
    </div>
  );
  return (
    <>
      <Upload
        action=""
        customRequest={handleUpload}
        listType="picture-card"
        accept='image/png, image/jpeg'
        fileList={fileList}
        maxCount={1}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default memo(UploadImg);