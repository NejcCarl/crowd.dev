import Sequelize from 'sequelize'

export default function (
  options,
  redisValue: Record<string, any>,
  hydratedEntity: Sequelize.Model,
  tableOfHydratedEntity: string,
) {
  const associations: any[] = Object.getOwnPropertyNames(
    options.database[tableOfHydratedEntity].associations,
  )
  associations.forEach((association) => {
    const associationType =
      options.database[tableOfHydratedEntity].associations[association].associationType
    if (associationType === 'HasMany') {
      const hydratedHasManyAssociation = redisValue[association].reduce(
        (accumulator, currentValue) => {
          const hydratedAssociationElement = options.database[association].build(currentValue)
          return hydratedAssociationElement
        },
        [],
      )
      hydratedEntity[association] = hydratedHasManyAssociation
    } else if (associationType === 'HasOne') {
      // TODO now !!Uroš review
      const hydratedHasOneAssociation = options.database[association].build(redisValue[association])
      hydratedEntity[association] = hydratedHasOneAssociation
    }
  })
}
