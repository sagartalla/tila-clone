import ResponseFormats from './ResponseFormats';
import Sentry from '../../../utils/sentryUtil';

let stack = [];

function recurseAndCheckType(expectedFormat, exisitingFormat, canBeEmpty, isOptional) {
  console.log('testing verify', expectedFormat, exisitingFormat, canBeEmpty, isOptional);
  stack.push(`testing verify expectedFormat:${expectedFormat}, exisitingFormat:${exisitingFormat}, canBeEmpty:${canBeEmpty}, isOptional:${isOptional}`);
  if(canBeEmpty && exisitingFormat.length === 0) {
    return true;
  }
  if(isOptional && ((typeof exisitingFormat === 'undefined') || (exisitingFormat === null))) {
    return true;
  }
  const temp = expectedFormat.constructor.name;
  const expectedType = temp === 'String' ? expectedFormat : temp;
  const exisitingType = exisitingFormat === null ? null : exisitingFormat.constructor.name;
  console.log('testing verify 1', expectedType, exisitingType);
  stack.push(`testing verify type, expectedType: ${expectedType}, exisitingFormat: ${exisitingFormat}`);
  let isValid = true;
  if(expectedType !== exisitingType) {
    return false;
  }
  if(expectedType === 'Object') {
    const keys = Object.keys(expectedFormat);
    for(var i = 0; i < keys.length; i++) {
      console.log('testing object for loop', i, keys[i], `isValid: ${isValid}`);
      stack.push(`testing object for loop, i:${i}, keys[i]:${keys[i]}, isValid: ${isValid}`);
      if(!isValid) {
        break;
      }
      if(keys[i] === 'RANDOM_ID') {
        const values = Object.values(exisitingFormat);
        for(var j = 0; j < values.length; j++) {
          if(!isValid) {
            break;
          }
          isValid = isValid && recurseAndCheckType(expectedFormat[keys[i]].VALUE_TYPE, values[j], expectedFormat[keys[i]].canBeEmpty, expectedFormat[keys[i]].isOptional);
        }
      } else {
        const expectedFormatValue = expectedFormat[keys[i]].VALUE_TYPE;
        const passingValue = expectedFormatValue === 'RECURSE' ? {
          "RANDOM_ID": {
            canBeEmpty: expectedFormat[keys[i]].canBeEmpty,
            VALUE_TYPE: expectedFormat
          }
        } : expectedFormatValue;
        isValid = isValid && recurseAndCheckType(passingValue, exisitingFormat[keys[i]], expectedFormat[keys[i]].canBeEmpty, expectedFormat[keys[i]].isOptional);
      }
    }
    return isValid;
  } else if(expectedType === 'Array') {
    for(var i = 0; i < exisitingFormat.length; i++) {
      console.log('testing array for loop', i, expectedFormat[i], `isValid: ${isValid}`);
      stack.push(`testing array for loop, i:${i}, expectedFormat[i]: ${expectedFormat[i]}, isValid: ${isValid}`);
      if(!expectedFormat[i]) {
        break;
      }
      isValid = isValid && recurseAndCheckType(expectedFormat[i], exisitingFormat[i], expectedFormat[i].canBeEmpty, expectedFormat[i].isOptional);
    }
    return isValid;
  } else {
     return true;
  }
}

const validate = (type, payload) => {
  stack = [];
  if(ResponseFormats[type]) {
    return recurseAndCheckType(ResponseFormats[type], payload);
  }
  return true;
}

const responseValidator = ({ getState }) => {
  return next => action => {
    let result;
    if(!action.payload) {
      return next(action);
    }
    try{
        result = validate(action.type, action.payload.data)
        if(!result) {
          Sentry.captureException(stack);
        }
    } catch (e) {
      Sentry.captureException(e);
    }
    if(result){
      return next(action);
    }
    return next({
      type: 'INVALID_API_RESPONSE'
    });
  }
} 

export default responseValidator;
