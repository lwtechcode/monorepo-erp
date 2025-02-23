import { Router } from "express";
import jwtVerify from "../middlewares/jwt-verify";
import authRoutes from "./auth.routes";
import billToPayRoutes from "./bill-to-pay.routes";
import billToReceiveRoutes from "./bill-to-receive.routes";
import clientRoutes from "./client.routes";
import companyRoutes from "./company.routes";
import paymentMethodsRoutes from "./payment-methods.routes";
import pingRoutes from "./ping.routes";
import productCategoryRoutes from "./product-category.routes";
import productRoutes from "./product.routes";
import saleBudgetRoutes from "./sale-budget.routes";
import saleRoutes from "./sale.routes";
import schedulingRoutes from "./scheduling.routes";
import supplierRoutes from "./supplier.routes";
import unitOfMeasurementRoutes from "./unit-of-measurement.routes";
import userRoutes from "./user.routes";
import passwordVerify from "../middlewares/password-verify";

const routes = Router();

routes.use("/", pingRoutes);
routes.use("/auth", authRoutes);
routes.use("/scheduling", passwordVerify, schedulingRoutes);
routes.use("/companies", jwtVerify, companyRoutes);
routes.use("/users", userRoutes);
routes.use("/clients", jwtVerify, clientRoutes);
routes.use("/suppliers", jwtVerify, supplierRoutes);
routes.use("/payment-methods", jwtVerify, paymentMethodsRoutes);
routes.use("/product-categories", jwtVerify, productCategoryRoutes);
routes.use("/bills-to-pay", jwtVerify, billToPayRoutes);
routes.use("/bills-to-receive", jwtVerify, billToReceiveRoutes);
routes.use("/products", jwtVerify, productRoutes);
routes.use("/units_of_measurement", jwtVerify, unitOfMeasurementRoutes);
routes.use("/sale-budgets", jwtVerify, saleBudgetRoutes);
routes.use("/sales", jwtVerify, saleRoutes);

export default routes;
