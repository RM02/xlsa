export const PERMISSIONS = {
    isUser: {
        dashboard: {
            ACCESS: true,
            WRITE: false,
            EDIT: false
        },
        usuarios: {
            ACCESS: false,
            WRITE: false,
            EDIT: false,
            DELETE: false
        },
        riesgos: {
            ACCESS: true,
            WRITE: false,
            EDIT: false,
            DELETE: false
        }
    },
    isAdmin: {
        dashboard: {
            ACCESS: true,
            WRITE: true,
            EDIT: true
        },
        usuarios: {
            ACCESS: true,
            WRITE: true,
            EDIT: true,
            DELETE: true
        },
        riesgos: {
            ACCESS: true,
            WRITE: false,
            EDIT: false,
            DELETE: false
        },
        reportes: {
            ACCESS: true,
            WRITE: false,
            EDIT: false,
            DELETE: false
        }
    }
}