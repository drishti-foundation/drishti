"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => async (context) => {
    const { params } = context;
    if (params.provider && !params.authentication) {
        context.params = {
            ...params,
            authentication: {
                strategy: 'anonymous',
            },
        };
    }
    return context;
};
