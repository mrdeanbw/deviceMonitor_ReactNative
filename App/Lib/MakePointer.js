export default (className, userId) => ({
  __type: 'Pointer',
  className: `${className}`,
  objectId: userId
})
