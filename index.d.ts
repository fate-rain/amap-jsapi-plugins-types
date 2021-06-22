// 安装时该声明文件版本，尚未包含插件的接口
import '@amap/amap-jsapi-types';

declare global {
    // 可在此编写一些"@amap/amap-jsapi-types"声明文件中不包含的插件接口声明
    namespace AMap {
        export type CallbackStatus = 'complete' | 'error' | 'no_data';

        export interface AutoCompleteProps {
            type: string;
            city: string;
            datatype: string;
            citylimit: boolean;
            input: string | HTMLDivElement;
            output: string | HTMLDivElement;
            outPutDirAuto: boolean;
            closeResultOnScroll: boolean;
            lang: string;
        }

        export interface AutocompleteResult {
            info: string;
            count: number;
            tips: {
                name: string;
                district: string;
                adcode: string;
            }[];
        }
        export interface AutoCompleteSearchCallback {
            (status: CallbackStatus, result: AutocompleteResult): void;
        }

        // Autocomplete 插件
        // https://lbs.amap.com/api/jsapi-v2/documentation#autocomplete
        export class Autocomplete {
            constructor(options: Partial<AutoCompleteProps>);
            setType(type: string): void;
            setCity(city: string): void;
            setCityLimit(citylimit: boolean): void;
            search(keyword: string, callback: AutoCompleteSearchCallback): void;
        }

        export interface PlaceSearchOptions {
            map: AMap.Map; // 展现结果的地图实例
            city: string; // 城市
            type: string; // 数据类别
            pageSize: number; // 每页结果数,默认10
            pageIndex: number; // 请求页码，默认1
            extensions: string; // 返回信息详略，默认为base（基本信息）
            citylimit: boolean; // 是否强制限制在设置的城市内搜索
            panel: string; // "panel" 结果列表将在此容器中进行展示。
            autoFitView: boolean; // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        }

        export interface CityInfo {
            name: string;
            citycode: string;
            adcode: string;
            count: string;
        }

        export interface Poi {
            id: string;
            name: string;
            type: string;
            location: AMap.LngLat;
            address: string;
            distance: number;
            tel: string;
            website: string;
            pcode: string;
            citycode: string;
            adcode: string;
            postcode: string;
            pname: string;
            cityname: string;
            adname: string;
            email: string;
            // eslint-disable-next-line camelcase
            entr_location: AMap.LngLat;
            // eslint-disable-next-line camelcase
            exit_location: AMap.LngLat;
        }

        export interface PoiList {
            pageIndex: number;
            pageSize: number;
            count: number;
            pois: Poi[];
        }

        export interface SearchResult {
            info: string;
            keywordList: string[];
            cityList: CityInfo[];
            poiList: PoiList[];
        }

        export interface SearchCallback {
            (status: CallbackStatus, result: SearchResult): void;
        }

        // https://lbs.amap.com/api/jsapi-v2/documentation#placesearch
        export class PlaceSearch {
            constructor(options: Partial<PlaceSearchOptions>);
            /**
             * 根据输入关键字提示匹配信息，支持中文、拼音
             * @param keyword
             * @param callback
             */
            search(keyword: string, callback?: SearchCallback): void;
            /**
             * 根据范围和关键词进行范围查询
             * @param keyword
             * @param bounds
             * @param callback
             */
            searchInBounds(keyword: string, bounds: AMap.Bounds, callback?: SearchCallback): void;
            /**
             * 根据中心点经纬度、半径以及关键字进行周边查询 radius取值范围：0-50000
             * @param keyword
             * @param center
             * @param radius
             */
            searchNearBy(keyword: string, center: AMap.LngLat, radius: number): void;
            /**
             * 根据PGUID 查询POI 详细信息
             */
            getDetails(PGUID: string): unknown;
            /**
             * 设置查询类别，多个类别用“|”分割
             * @param type
             */
            setType(type: string): void;
            /**
             * 设置显示查询结果页码
             * @param pageIndex
             */
            setPageIndex(pageIndex: number): void;
            /**
             * 设置每页显示查询结果数量
             * @param pageSize
             */
            setPageSize(pageSize: number): void;
            /**
             * 设置查询城市, 支持cityname（中文或中文全拼）、citycode、adcode
             * @param city
             */
            setCity(city: string): void;
            /**
             * 设置是否强制限制城市
             * @param citylimit
             */
            setCityLimit(citylimit: boolean): void;
        }
    }
}
