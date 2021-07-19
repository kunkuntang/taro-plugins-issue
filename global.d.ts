declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace JSX {
    interface IntrinsicElements {
        'import': React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
    }
}

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    JSONP_NAME: 'advertisement',
    [key: string]: any;
  }
}

/** 静态资源 cdn 地址 */
declare const CDN_URL: string

/** 广告落地页的基本域名 */
declare const BASE_URL: string

