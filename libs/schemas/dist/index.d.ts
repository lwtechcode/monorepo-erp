import * as Yup from 'yup';

declare const MESSAGE_NULL: {
    DEFAULT: string;
};

declare const REQUIREDS: {
    DEFAULT: string;
};

declare const clientSchema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">;

type schemaSalesType = {
    client_id: string | null;
    client: string | null;
    method_payment: string | null;
    discount: string | null;
    total_value: string | null;
    additions: string | null;
};

declare const salesInitialValue: schemaSalesType;
declare const salesSchema: Yup.ObjectSchema<{
    client: string;
    method_payment: string;
    discount: string | null | undefined;
}, Yup.AnyObject, {
    client: undefined;
    method_payment: undefined;
    discount: undefined;
}, "">;

export { MESSAGE_NULL, REQUIREDS, clientSchema, salesInitialValue, salesSchema, schemaSalesType };
