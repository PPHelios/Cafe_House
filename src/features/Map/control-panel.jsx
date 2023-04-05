import { memo } from "preact/compat";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function ControlPanel({ events = {} }) {
  return (
    <div className="control-panel">
      <h3>Draggable Marker</h3>
      <p>Try dragging the marker to another location.</p>
      <div>
        {eventNames.map((eventName) => {
          const lngLat = events[eventName];
          return (
            <div key={eventName}>
              <strong>{eventName}:</strong>{" "}
              {lngLat ? (
                `lng: ${round5(lngLat.lng)}, lat: ${round5(lngLat.lat)}`
              ) : (
                <em>null</em>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ControlPanel);
