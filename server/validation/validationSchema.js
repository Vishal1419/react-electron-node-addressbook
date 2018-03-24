const AppResponse = require('../utils/appResponse');
const constants = require('./constants');

module.exports = {
  contact: {
    type: Object,
    unknownKeys: 'allow',
    required: true,
    schema: {
      name: {
        type: String,
        trim: true,
        required: true,
        match: /^.{1,}$/,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.NAME.INVALID_DT,
          },
          required: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.NAME.REQUIRED,
          },
          match: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.NAME.REQUIRED,
          },
          allowNull: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.NAME.REQUIRED,
          }
        }
      },
      address: {
        type: String,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.ADDRESS.INVALID_DT,
          }
        }
      },
      mobileNo: {
        type: String,
        trim: true,
        required: true,
        match: /^[1-9][0-9]{9,12}$/,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.MOBILE_NO.INVALID_DT,
          },
          required: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.MOBILE_NO.REQUIRED,
          },
          match: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.MOBILE_NO.PATTERN,
          },
          allowNull: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.MOBILE_NO.REQUIRED,
          }
        }
      },
      email: {
        type: String,
        trim: true,
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.EMAIL.INVALID_DT,
          },
          match: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.EMAIL.PATTERN,
          },
        }
      },
      village: {
        type: String,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.VILLAGE.INVALID_DT,
          }
        }
      },
      taluka: {
        type: String,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.TALUKA.INVALID_DT,
          }
        }
      },
      district: {
        type: String,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.DISTRICT.INVALID_DT,
          }
        }
      },
      pincode: {
        type: String,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.PIN_CODE.INVALID_DT,
          }
        }
      },
    },
    errors: {
      required: {
        errorCode: AppResponse.REQUIRED_FIELD,
        message: constants.DETAILS_REQUIRED
      }
    }
  },
}