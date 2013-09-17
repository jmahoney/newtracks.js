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
  if session[:lastfm_session].nil?
    redirect "http://www.last.fm/api/auth/?api_key=#{ENV['LAST_API']}&cb=#{url('/callback')}"
  else
    erb :index
  end
end

# handle getting a token back from last.fm
get '/callback' do  
  session[:lastfm_session] = lastfm.auth.get_session(params[:token])
  redirect '/'
end

# get recent tracks for the logged in user
get '/recent_tracks' do
  content_type :json  
  tracks = lastfm.user.get_recent_tracks(username)
  tracks.to_json
end

get '/recommended_artists' do
  content_type :json
  api = lastfm
  api.session = session[:lastfm_session]['key']
  artists = api.user.get_recommended_artists
  artists.to_json
end

helpers do
  def lastfm
    Lastfm.new(ENV['LAST_API'], ENV['LAST_SECRET'])
  end
  
  def username
    if session[:lastfm_session]
      session[:lastfm_session]['name']
    else
      "UNKNOWN"
    end
  end
end
