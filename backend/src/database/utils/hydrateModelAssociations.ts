// import Sequelize from 'sequelize'
//
// export default function (
//   options,
//   redisValue: Record<string, any>,
//   hydratedEntity: Sequelize.Model,
//   tableOfHydratedEntity: string,
// ) {
//   const associations: any[] = Object.getOwnPropertyNames(
//     options.database[tableOfHydratedEntity].associations,
//   )
//   associations.forEach((association) => {
//     const associationType =
//       options.database[tableOfHydratedEntity].associations[association].associationType
//     console.log(
//       '______________________________________________________________________________________________________________________',
//     )
//     console.log({ association, associationType })
//     if (associationType === 'HasMany') {
//       redisValue = redisValue || []
//       console.log({ redisValue })
//       const isArray = Array.isArray(redisValue)
//       console.log({ isArray })
//       let hydratedHasManyAssociation
//       if (isArray) {
//         hydratedHasManyAssociation = redisValue[association].reduce(
//           (accumulator, currentValue) => options.database[association].build(currentValue),
//           [],
//         )
//       } else {
//         console.log(`_______________jow jow  jow_______________`)
//         try {
//           hydratedHasManyAssociation = options.database[association].build(redisValue)
//         } catch (err) {
//           console.log({ err })
//         }
//         console.log({ hydratedHasManyAssociation })
//       }
//
//       console.log({ hydratedHasManyAssociation })
//       hydratedEntity[association] = hydratedHasManyAssociation
//       console.log({ hydratedEntity })
//     } else if (associationType === 'HasOne') {
//       // TODO now !!Uroš review
//       const hydratedHasOneAssociation = options.database[association].build(redisValue[association])
//       hydratedEntity[association] = hydratedHasOneAssociation
//     }
//   })
// }
