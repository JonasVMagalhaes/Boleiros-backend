import cors from "cors";
import { RequisitionMethod } from "../../shared/enums/requisition-methods.enum";
import { DeviceInfoEnum } from "../../shared/enums/device-info.enum";
import { AuthHeaderEnum } from "../../shared/enums/auth-header.enum";

export default class CorsMiddleware {
    static middleware = cors({
        origin: ["http://localhost:4200"],
        optionsSuccessStatus: 200,
        methods: [
            RequisitionMethod.GET,
            RequisitionMethod.POST,
            RequisitionMethod.PUT
        ],
        allowedHeaders: [
            DeviceInfoEnum.BROWSER_VERSION,
            DeviceInfoEnum.DEVICE_TYPE,
            DeviceInfoEnum.PLATFORM,
            DeviceInfoEnum.USER_AGENT,
            AuthHeaderEnum.ACCESS_TOKEN
        ],
        exposedHeaders: [],
        maxAge: 15
    });
}