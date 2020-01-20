import mem from 'mem'

const TOTAL_STATS_MAP = {
  m1: 'matches'
}

export const mapTotalStats = stats =>
  Object.keys(TOTAL_STATS_MAP).reduce(
    (acc, curr) => ({
      ...acc,
      [TOTAL_STATS_MAP[curr]]: stats[curr]
    }),
    {}
  )

export const mapTotalStatsMemoized = mem(mapTotalStats)

const AVERAGE_STATS_MAP = {
  c2: 'averageKDRatio',
  c3: 'averageKRRatio',
  c4: 'averageHeadshots',
  i6: 'averageKills'
}

export const mapAverageStats = stats => {
  // Console.log('stats', stats)
  return stats
    .map(stat =>
      Object.keys(AVERAGE_STATS_MAP).reduce(
        (acc, curr) => ({
          ...acc,
          [AVERAGE_STATS_MAP[curr]]: stat[curr]
        }),
        {
          winRate: stat.i2 === stat.teamId ? 'win' : 'loss',
          maps: {
            map: stat.i1,
            winRate: stat.i2 === stat.teamId ? 'win' : 'loss'
          }
        }
      )
    )
    .reduce((acc, curr, i) => {
      // Console.log('acc', acc)
      // console.log('curr', curr)
      return Object.keys(curr).reduce((acc2, curr2) => {
        let value

        if (stats.length === i + 1) {
          if (curr2 === 'winRate') {
            const results = [...acc[curr2], curr[curr2]]
            const wins = results.filter(x => x === 'win').length
            value = Math.round((wins / results.length) * 100)
          } else if (curr2 === 'maps') {
            const results = [...acc[curr2], curr[curr2]]
            const maps = results.reduce((acc3, curr3) => {
              let winRate = [curr3.winRate]
              if (acc3[curr3.map]) {
                winRate = [...acc3[curr3.map], curr3.winRate]
              }
              return {
                ...acc3,
                [curr3.map]: winRate
              }
            }, {})
            // Console.log('maps', maps)
            const sortable = []
            for (const map in maps) {
              if (map) {
                sortable.push([
                  map,
                  {
                    wins: maps[map].filter(x => x === 'win').length,
                    total: maps[map].length,
                    winPct: Math.round(
                      (maps[map].filter(x => x === 'win').length /
                        maps[map].length) *
                        100
                    )
                  }
                ])
              }
            }
            sortable.sort((a, b) => {
              return b[1].total - a[1].total
            })
            // Console.log(sortable)

            value = sortable
          } else {
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
          }
        } else {
          value = (acc[curr2] || []).concat(curr[curr2])
        }
        // Console.log('acc2', acc2)
        // console.log('curr2', curr2)

        return {
          ...acc2,
          [curr2]: value
        }
      }, {})
    }, {})
}

export const mapAverageStatsMemoized = mem(mapAverageStats)
