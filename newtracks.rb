require 'sinatra'
require 'lastfm'
require 'json'

if settings.environment == :development
  require 'debugger'
  require 'dotenv'
  Dotenv.load   
end

enable :sessions

get '/' do  
  if session[:key].nil?
    redirect "http://www.last.fm/api/auth/?api_key=#{ENV['LAST_API']}&cb=#{url('/callback')}"
  else
    erb :index
  end
end

# handle getting a token back from last.fm
get '/callback' do    
  lastfm_session = api.auth.get_session(params[:token])
  session[:name] = lastfm_session['name']
  session[:key] = lastfm_session['key']
  redirect '/'
end

# get recent tracks for the logged in user
get '/recent_tracks' do
  content_type :json  
  tracks = api.user.get_recent_tracks(username)
  tracks.to_json
end

get '/recommended_artists' do
  content_type :json  
  artists = api(session[:key]).user.get_recommended_artists
  artists.to_json
end

get '/reset' do
  session[:name] = nil
  session[:key] = nil
  redirect '/'
end



helpers do
  def api(session_key = nil)
    lastfm = Lastfm.new(ENV['LAST_API'], ENV['LAST_SECRET'])
    if session_key
      lastfm.session = session_key
    end
    lastfm
  end
  
  def username
    session[:name].nil? ? 'UNKNOWN' : session[:name]
  end
end
