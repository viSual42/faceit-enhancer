const TOTAL_STATS_MAP = {
  m1: 'matches',
  k6: 'winRate'
}

export const mapTotalStats = stats =>
  Object.keys(TOTAL_STATS_MAP).reduce(
    (acc, curr) => ({
      ...acc,
      [TOTAL_STATS_MAP[curr]]: stats[curr]
    }),
    {}
  )

const AVERAGE_STATS_MAP = {
  c2: 'averageKDRatio',
  c3: 'averageKRRatio',
  c4: 'averageHeadshots',
  i6: 'averageKills'
}

export const mapAverageStats = stats =>
  stats
    .map(stat =>
      Object.keys(AVERAGE_STATS_MAP).reduce(
        (acc, curr) => ({
          ...acc,
          [AVERAGE_STATS_MAP[curr]]: stat[curr]
        }),
        {}
      )
    )
    .reduce(
      (acc, curr, i) =>
        Object.keys(curr).reduce((acc2, curr2) => {
          let value

          if (stats.length === i + 1) {
            value =
              (
                acc[curr2].reduce(
                  (acc3, curr3) => acc3 + Number(curr3),
                  Number(curr[curr2])
                ) / stats.length
              ).toFixed(2) / 1

            if (
              curr2 === AVERAGE_STATS_MAP.c4 ||
              curr2 === AVERAGE_STATS_MAP.i6
            ) {
              value = Math.round(value)
            }
          } else {
            value = (acc[curr2] || []).concat(curr[curr2])
          }

          return {
            ...acc2,
            [curr2]: value
          }
        }, {}),
      {}
    )