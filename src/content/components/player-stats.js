/** @jsx h */
import { h } from 'dom-chef'

const stat = (value, label, flex = 1) => (
  <div style={{ flex, padding: '5px 9px' }}>
    {value}
    <div className="text-sm">{label}</div>
  </div>
)

const statsVerticalDivider = () => (
  <div style={{ width: 1, background: '#333' }} />
)

export default ({
  matches,
  winRate,
  maps,
  averageKDRatio,
  averageKills,
  averageKRRatio,
  averageHeadshots,
  alignRight = false
}) => (
  <div>
    <div
      className="text-muted"
      style={{
        display: 'flex',
        'border-top': '1px solid #333',
        'text-align': alignRight && 'right',
        'font-size': 12,
        'line-height': 12
      }}
    >
      <div>
        <div
          className="text-sm"
          style={{ 'border-bottom': '1px solid #333', padding: '5px 9px' }}
        >
          Overall
        </div>
        {stat(matches, 'Matches', 0)}
      </div>
      {statsVerticalDivider()}
      <div style={{ flex: 4 }}>
        <div
          className="text-sm"
          style={{ 'border-bottom': '1px solid #333', padding: '5px 9px' }}
        >
          Last 20 Games Avg
        </div>
        <div style={{ display: 'flex' }}>
          {stat(`${winRate}%`, 'Win Rate')}
          {statsVerticalDivider()}
          {stat(`${averageKills} / ${averageHeadshots}%`, 'Kills / HS')}
          {statsVerticalDivider()}
          {stat(`${averageKDRatio} / ${averageKRRatio}`, 'K/D / K/R')}
        </div>
      </div>
    </div>
    <div
      className="text-muted"
      style={{
        display: 'flex',
        'border-top': '1px solid #333',
        'text-align': alignRight && 'right',
        'font-size': 12,
        'line-height': 12
      }}
    >
      {maps
        // .filter(element => element[1].total > 1)
        // .slice(0, 5)
        .map(element => {
          // Console.log(element)
          return (
            <div key={element[0]}>
              <div
                className="text-sm"
                style={{
                  'border-bottom': '1px solid #333',
                  padding: '5px 9px'
                }}
              >
                {element[0].slice(3)}
              </div>
              {stat(`${element[1].wins} / ${element[1].total}`, 'w/n', 1)}
            </div>
          )
        })}
    </div>
  </div>
)
