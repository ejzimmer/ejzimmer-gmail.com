import addHours from 'date-fns/addHours';
import { utcToZonedTime } from 'date-fns-tz';

export async function fetchTrains() {
  const now = new Date()
  const endTime = addHours(now, 1)
  
  const response = await fetch('https://ovsgkptz6h.execute-api.ap-southeast-2.amazonaws.com/default/next-train?stop_id=1143&route_id=12')
  if (response.status === 200) {
    const json = await response.json();
    return json.departures
      .filter(departure => departure.direction_id === 1)
      .map(departure => departure.estimated_departure_utc || departure.scheduled_departure_utc)
      .map(departureTimeUtc => utcToZonedTime(departureTimeUtc, 'Australia/Melbourne'))
      .filter(departureTime => (departureTime > now && departureTime < endTime))
      .map(departureTime => Math.round((departureTime - now) / 1000 / 60))
  }

  return response.status;
}   